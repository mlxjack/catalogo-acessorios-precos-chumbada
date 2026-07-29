# -*- coding: utf-8 -*-
"""
Confere os precos, variacoes e cores do data.js contra o export CSV da Shopify.

USO:
    python scratch/conferir_precos_csv.py "caminho/products_export.csv"

    (sem argumento, tenta o ultimo caminho usado - ver CSV_PADRAO abaixo)

O QUE ELE FAZ
    Casa cada produto do site com o produto da Shopify pelo handle que esta
    dentro do campo "link" (.../products/<handle>). Depois compara preco base,
    preco de cada variacao e lista de cores.

DUAS REGRAS IMPORTANTES (aprendidas na varredura de jul/2026)

  1. O site FUNDE varios produtos da Shopify num card so.
     Ex.: "Suporte de Vara Slim" junta 4 produtos da Shopify (o de plastico,
     o de borracha, o apoio de borracha e o copo de borracha).
     Por isso, quando um preco nao bate com o handle do proprio card, o script
     procura esse preco no CSV INTEIRO antes de acusar erro. Se achar em outro
     produto, vira AVISO (provavelmente e uma peca fundida) em vez de ERRO.

  2. Produto que embute peca de reposicao NAO usa "a partir de" no preco base.
     O preco base mostra o PRODUTO PRINCIPAL, nao a peca mais barata.
     Esses produtos estao listados em EMBUTEM_PECAS e sao pulados na checagem
     de preco base - senao apareceriam como erro toda vez.

FALSOS POSITIVOS CONHECIDOS (ja tratados, nao mexer)
  - "Barra" na coluna Cor do Suporte Premium nao e cor: e o preenchimento da
    opcao "Somente Barra". Ver COR_IGNORAR.
  - Grafias mantidas de proposito: "Branco" (site) x "Branca" (Shopify) na
    Agulha de Tarrafa, e "Glow (brilha no escuro)" x "Glow" no Alicate.
  - Cores Azul e Vermelho foram removidas do Suporte de Vara Slim de proposito.
"""
import csv
import io
import json
import os
import re
import sys
import unicodedata
from collections import defaultdict, OrderedDict

# ---------------------------------------------------------------- configuracao

AQUI = os.path.dirname(os.path.abspath(__file__))
DATA_JS = os.path.join(AQUI, '..', 'assets', 'js', 'data.js')
CSV_PADRAO = r"D:\Dowloads HD 1T\products_export_acessorios_completo.csv"

# Produtos cujo preco base aponta para o produto principal, nao para a peca
# mais barata que esta dentro do card. NAO checar preco base nesses.
EMBUTEM_PECAS = {
    'regua-cantoneira',
    'porta-pernada-cano',
    'suporte-horiziontal',
    'suporte-de-vara-calao',
    'suporte-de-vara-slim',
    'varal-chumbada',
}

# Valores da coluna "Cor" do CSV que nao sao cor de verdade.
COR_IGNORAR = {'barra'}

# Pares (site, shopify) de grafia diferente que devem ser tratados como iguais.
COR_SINONIMO = [
    ('branco', 'branca'),
    ('glowbrilhanoescuro', 'glow'),
]

# ---------------------------------------------------------------- utilitarios

def brl(v):
    return ('R$ %.2f' % v).replace('.', ',')


def ler_brl(s):
    m = re.search(r'([\d.]+,\d{2})', s or '')
    return round(float(m.group(1).replace('.', '').replace(',', '.')), 2) if m else None


def norm(s):
    s = unicodedata.normalize('NFD', (s or '').lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '', s)


def handle_do(p):
    m = re.search(r'/products/([^?#/]+)', p.get('link') or '')
    return m.group(1) if m else None


SINONIMOS = {}
for a, b in COR_SINONIMO:
    SINONIMOS[a] = b
    SINONIMOS[b] = b


def cor_chave(nome):
    n = norm(nome)
    return SINONIMOS.get(n, n)


# ---------------------------------------------------------------- leitura

def ler_site(caminho):
    js = io.open(caminho, encoding='utf-8').read()
    bruto = js.split('window.PRODUCTS = ')[1].rsplit(';', 1)[0]
    return json.loads(bruto)


def ler_csv(caminho):
    """Agrupa as linhas do export por handle."""
    prods = OrderedDict()
    with io.open(caminho, encoding='utf-8-sig', newline='') as f:
        for r in csv.DictReader(f):
            h = r['Handle'].strip()
            if not h:
                continue
            p = prods.setdefault(h, {'handle': h, 'title': '', 'status': '',
                                     'opcoes': [None, None, None], 'variantes': []})
            if r['Title'].strip():
                p['title'] = r['Title'].strip()
            if r['Status'].strip():
                p['status'] = r['Status'].strip()
            for i, k in enumerate(('Option1 Name', 'Option2 Name', 'Option3 Name')):
                if r[k].strip():
                    p['opcoes'][i] = r[k].strip()
            preco = r['Variant Price'].strip()
            if not preco:
                continue  # linha so de imagem
            p['variantes'].append({
                'o': [r['Option1 Value'].strip(), r['Option2 Value'].strip(),
                      r['Option3 Value'].strip()],
                'preco': round(float(preco), 2),
            })
    return prods


# ---------------------------------------------------------------- comparacao

def conferir(site, base):
    todos = defaultdict(set)          # preco -> handles que tem esse preco
    for c in base.values():
        for v in c['variantes']:
            todos[v['preco']].add(c['handle'])

    erros, avisos, sem_par = [], [], []

    for p in site:
        h = handle_do(p)
        c = base.get(h)
        if not c:
            sem_par.append((p['name'], h))
            continue

        e, a = [], []
        proprios = {v['preco'] for v in c['variantes']}

        # --- preco de cada variacao -------------------------------------
        for nome, txt in (p.get('vars') or []):
            val = ler_brl(txt)
            if val is None:
                e.append(u'variacao sem preco: "%s"' % nome)
            elif val in proprios:
                pass                                   # bate com o proprio produto
            elif val in todos:                         # regra 1: produto fundido
                a.append(u'"%s" = %s vem de outro produto: %s'
                         % (nome, brl(val), ', '.join(sorted(todos[val]))))
            else:
                perto = min(todos, key=lambda x: abs(x - val)) if todos else None
                e.append(u'PRECO INEXISTENTE no CSV: "%s" = %s (mais proximo: %s)'
                         % (nome, brl(val), brl(perto) if perto else '?'))

        # --- preco base --------------------------------------------------
        base_val = ler_brl(p.get('price'))
        tem_apartir = 'partir' in (p.get('price') or '').lower()
        valores = [ler_brl(v[1]) for v in (p.get('vars') or []) if ler_brl(v[1])]

        if base_val is None:
            e.append(u'preco base invalido: %r' % p.get('price'))
        elif h in EMBUTEM_PECAS:
            # regra 2: base mostra o produto principal. So checa o "a partir de".
            if tem_apartir:
                a.append(u'tem "a partir de" mas embute peca de reposicao '
                         u'(a convencao e mostrar o preco do produto principal)')
        elif valores:
            menor, maior = min(valores), max(valores)
            if abs(base_val - menor) > 0.005:
                e.append(u'preco base %s, mas a variacao mais barata e %s'
                         % (p['price'], brl(menor)))
            if menor != maior and not tem_apartir:
                e.append(u'preco base %s sem "a partir de" (vai de %s a %s)'
                         % (p['price'], brl(menor), brl(maior)))
            if menor == maior and tem_apartir:
                a.append(u'diz "a partir de" mas so ha um preco (%s)' % brl(menor))
        elif base_val not in proprios:
            e.append(u'preco base %s | no CSV: %s'
                     % (p['price'], ', '.join(brl(x) for x in sorted(proprios))))

        # --- cores --------------------------------------------------------
        idx = [i for i, n in enumerate(c['opcoes']) if n and norm(n) in ('cor', 'cores')]
        if idx and p.get('swatches'):
            i = idx[0]
            do_csv = {}
            for v in c['variantes']:
                if v['o'][i] and norm(v['o'][i]) not in COR_IGNORAR:
                    do_csv.setdefault(cor_chave(v['o'][i]), v['o'][i])
            do_site = {cor_chave(s[0]): s[0] for s in p['swatches']}
            falta = sorted(do_csv[k] for k in do_csv if k not in do_site)
            sobra = sorted(do_site[k] for k in do_site if k not in do_csv)
            if falta:
                a.append(u'cor na Shopify mas nao no site: %s' % ', '.join(falta))
            if sobra:
                a.append(u'cor no site mas nao na Shopify: %s' % ', '.join(sobra))

        if c['status'] and c['status'] != 'active':
            a.append(u'produto esta "%s" na Shopify' % c['status'])

        if e:
            erros.append((p['name'], h, e))
        if a:
            avisos.append((p['name'], h, a))

    return erros, avisos, sem_par


# ---------------------------------------------------------------- saida

def main():
    caminho_csv = sys.argv[1] if len(sys.argv) > 1 else CSV_PADRAO
    if not os.path.exists(caminho_csv):
        print(u'CSV nao encontrado: %s' % caminho_csv)
        print(u'Uso: python scratch/conferir_precos_csv.py "caminho/export.csv"')
        return 2

    site = ler_site(DATA_JS)
    base = ler_csv(caminho_csv)
    erros, avisos, sem_par = conferir(site, base)

    print(u'Site: %d produtos  |  CSV: %d produtos, %d variantes'
          % (len(site), len(base), sum(len(c['variantes']) for c in base.values())))

    print(u'\n' + u'=' * 74)
    print(u'ERROS  (%d produtos) - precos que nao existem no CSV' % len(erros))
    print(u'=' * 74)
    for nome, h, itens in erros:
        print(u'\n>>> %s  [%s]' % (nome, h))
        for x in itens:
            print(u'      * ' + x)
    if not erros:
        print(u'\n   Nenhum. Todos os precos batem com a Shopify.')

    print(u'\n\n' + u'=' * 74)
    print(u'AVISOS  (%d produtos) - conferir, boa parte e intencional' % len(avisos))
    print(u'=' * 74)
    for nome, h, itens in avisos:
        print(u'\n--- %s  [%s]' % (nome, h))
        for x in itens:
            print(u'      . ' + x)

    if sem_par:
        print(u'\n\n' + u'=' * 74)
        print(u'SEM PAR NO CSV (%d) - link generico ou produto so do site' % len(sem_par))
        print(u'=' * 74)
        for nome, h in sem_par:
            print(u'   - %s  (handle: %s)' % (nome, h))

    no_site = {handle_do(p) for p in site}
    fora = [c for c in base.values() if c['handle'] not in no_site]
    if fora:
        print(u'\n\n' + u'=' * 74)
        print(u'NA SHOPIFY MAS NAO NO SITE (%d) - varios sao pecas ja fundidas' % len(fora))
        print(u'=' * 74)
        for c in fora:
            ps = sorted({v['preco'] for v in c['variantes']})
            faixa = ('%s a %s' % (brl(min(ps)), brl(max(ps)))) if len(ps) > 1 else (
                brl(ps[0]) if ps else 'sem preco')
            print(u'   - %-46s %s' % (c['title'][:46], faixa))

    print(u'\n')
    return 1 if erros else 0


if __name__ == '__main__':
    if sys.platform == 'win32':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.exit(main())
