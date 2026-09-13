# Avalanche en Munay (sin tocar `.env`)

La red de donación **ya es Avalanche Fuji** (`43113`) por defecto. No hace
falta editar `.env` para que el botón Donar use Avalanche.

Unlock (la Key del archivo) sigue en **Sepolia**. Eso no se arregla con
Avalanche: son dos operaciones distintas. Si el chip del header dice
`Donar · Avalanche Fuji` y `Acceso · Sepolia`, está bien.

## Qué tienes que hacer

Tres cosas, ninguna en `.env`:

1. Poner una tesorería real en la base (si no, el botón queda apagado).
2. Meter AVAX + USDC de prueba en **la misma wallet que muestra Privy**.
3. Donar desde una comunidad. La app cambia sola a Fuji.

### 1. Tesorería (Prisma Studio, no `.env`)

```bash
pnpm db:studio
```

Abre el modelo `Community` y en las tres filas
(`uru-chipaya`, `tiwanaku`, `tarabuco`) pega tu wallet en
`treasuryAddress`. Sirve la misma dirección de demo para las tres.

O desde Docker, sin Studio (cambia `0xTUWALLET`):

```bash
docker compose exec db psql -U postgres -d palmera -c \
  "UPDATE \"Community\" SET \"treasuryAddress\" = '0xTUWALLET' WHERE \"treasuryAddress\" = '0x0000000000000000000000000000000000000000';"
```

Recarga la página de la comunidad. Si el botón sigue gris, la tesorería
sigue en cero.

`DEMO_TREASURY_ADDRESS` en `.env` es solo un atajo del seed. No es
obligatorio.

### 2. Fondos de prueba

Copia la dirección que muestra el botón de wallet en Munay. Esa, no otra.

| Token | Para qué | Dónde |
| --- | --- | --- |
| AVAX Fuji | gas de la transacción | https://build.avax.network/console/primary-network/faucet |
| USDC Fuji | lo que donas | https://faucet.circle.com → **Avalanche Fuji** |

Contrato USDC Fuji: `0x5425890298aed601595a70AB815c96711a31Bc65`.

En MetaMask / Core, si no ves el saldo USDC, importa ese contrato en
**Avalanche Fuji Testnet** (chain id `43113`, RPC
`https://api.avax-test.network/ext/bc/C/rpc`, explorador
https://testnet.snowtrace.io).

Privy con Google: la wallet embebida también necesita esos tokens. Pide
el faucet a la dirección embebida, no a tu MetaMask de siempre.

### 3. Donar

1. Entra a `/comunidades/uru-chipaya` (o Tiwanaku / Tarabuco).
2. Pulsa Donar. Si estás en otra red, Munay pide **cambiar a Fuji**.
3. Firma el `transfer` de USDC.
4. El hash debe abrir en https://testnet.snowtrace.io.

Si la wallet externa no tiene Fuji, acepta el `switchChain` del navegador.
No hace falta editar variables.

## Qué no vas a lograr sin `.env`

| Quieres | Por qué sí hace falta `.env` / rebuild |
| --- | --- |
| Donar en Avalanche **mainnet** (`43114`) | `NEXT_PUBLIC_DONATION_CHAIN_ID=43114` y rebuild |
| Unlock también en Avalanche | Lock nuevo en C-Chain + `NEXT_PUBLIC_UNLOCK_CHAIN_ID=43114` |
| Unlock en Fuji | **No existe.** Unlock no está desplegado en Fuji |

Para el demo y el bounty de Avalanche basta Fuji: la tx es real, on-chain,
en una red Avalanche. Mainnet es para cuando haya USDC y AVAX de verdad.

## Si algo falla

- Botón Donar deshabilitado → tesorería en `0x000…000`.
- `switchChain` rechazado → añade Fuji a la wallet y reintenta.
- Tx revierte → sin USDC Fuji o sin AVAX para gas, o tesorería inválida.
- El archivo no se abre → eso es Unlock/Sepolia, no Avalanche.
