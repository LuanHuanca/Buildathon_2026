# Unlock Protocol en Munay

Munay usa una Key ERC-721 de Unlock como membresía de acceso. La membresía
abre investigación; donar USDC es una operación distinta.

## Redes verificadas

| Entorno    | Red               | Chain ID | Unlock                                       |
| ---------- | ----------------- | -------: | -------------------------------------------- |
| Desarrollo | Ethereum Sepolia  | 11155111 | `0x36b34e10295cCE69B652eEB5a8046041074515Da` |
| Alternativa | Base Sepolia     |    84532 | `0x259813B665C8f6074391028ef782e27B65840d89` |
| Producción | Avalanche C-Chain |    43114 | `0x70cBE5F72dD85aA634d07d2227a421144Af734b3` |

Unlock **no está desplegado en Avalanche Fuji (43113)**. El demo actual usa
donaciones en Fuji y el Lock en Sepolia (`sepolia.etherscan.io`). Producción
puede unificar ambas operaciones en Avalanche C-Chain.

Subgraph: `https://subgraph.unlock-protocol.com/{chainId}`.

## Revisar o crear el Lock

1. Abre <https://app.unlock-protocol.com/dashboard>.
2. Conecta la wallet que utilizaste anteriormente.
3. Cambia a **Sepolia** si el lock ya aparece en Etherscan, o a
   **Base Sepolia** si lo vas a crear ahí.
4. Revisa `My memberships` / `Locks`. Si ya existe `Munay - Acceso
Investigación`, abre sus detalles y copia la dirección del contrato.
5. Si no existe, crea un Lock:
   - Nombre: `Munay - Acceso Investigación`
   - Duración: sin expiración (`0`)
   - Token: moneda nativa
   - Precio: `0`
   - Cantidad: ilimitada
6. Guarda la dirección en `NEXT_PUBLIC_MUNAY_LOCK_ADDRESS`.

Para producción repite el proceso en Avalanche C-Chain y cambia
`NEXT_PUBLIC_UNLOCK_CHAIN_ID=43114`.

## Flujo implementado

1. La persona ve un preview del archivo.
2. `getHasValidKey(address)` comprueba la Key en el cliente.
3. El checkout oficial de Unlock permite emitir la Key.
4. El servidor vuelve a comprobar `owner`, `lock` y `expiration` en el
   subgraph antes de devolver el contenido.
5. El cliente fuerza `refetch()` al cerrar el checkout. El fetch servidor usa
   `cache: "no-store"` para no dejar la demo bloqueada durante 30 segundos.

El servidor falla cerrado si el indexador no responde. Una expiración `0`
significa Key vencida o cancelada; una Key perpetua usa `uint256.max`.

## Entregar Keys sin cobro

Un Lock Manager o Key Granter puede llamar:

```solidity
grantKeys(address[] recipients, uint256[] expirationTimestamps, address[] keyManagers)
```

Las tres listas deben tener la misma longitud. Para la demo se usa **un solo
Lock de investigación**. En una V2 cada investigador puede administrar el
suyo.

## Verificación

- Sepolia: `https://sepolia.etherscan.io/address/{LOCK}`
- Base Sepolia: `https://sepolia.basescan.org/address/{LOCK}`
- Avalanche: `https://snowtrace.io/address/{LOCK}`
- La pantalla de contenido debe pasar de preview a contenido completo.
- Abrir el endpoint tRPC sin una Key válida debe responder `FORBIDDEN`.

## Deuda de seguridad

El servidor verifica que la dirección posee la Key, pero la dirección llega
desde el cliente. Antes de producción se debe exigir un nonce firmado (SIWE) o
validar el access token de Privy en el servidor para demostrar control de la
wallet.

# Configuración de Unlock

## Redes

Desarrollo usa dos redes:

- Donaciones: Avalanche Fuji (`chainId` 43113), USDC `0x5425890298aed601595a70AB815c96711a31Bc65`, explorador `https://testnet.snowtrace.io`.
- Acceso Unlock (demo actual): Ethereum Sepolia (`chainId` 11155111), fábrica Unlock `0x36b34e10295cCE69B652eEB5a8046041074515Da`, explorador `https://sepolia.etherscan.io`, subgraph `https://subgraph.unlock-protocol.com/11155111`.
- Alternativa: Base Sepolia (`chainId` 84532), fábrica Unlock `0x259813B665C8f6074391028ef782e27B65840d89`.
- Unlock no está desplegado en Fuji; por eso acceso y donaciones usan redes distintas durante desarrollo.

Producción usa únicamente Avalanche C-Chain:

- `chainId` 43114.
- Fábrica Unlock: `0x70cBE5F72dD85aA634d07d2227a421144Af734b3`.
- USDC nativo: `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E`.
- Subgraph: `https://subgraph.unlock-protocol.com/43114`.

No mezclar direcciones entre redes. Una misma cadena debe usarse para crear el Lock, consultar sus llaves y verificarlo en el explorador.

## Lock compartido de investigación

La demo usa un solo Lock compartido para todo el contenido de investigación:

- Precio de llave: `0`.
- Moneda: token nativo de la red.
- Duración: `0` (perpetua).
- Oferta máxima: ilimitada.

No hay una dirección de Lock predefinida en este repositorio. Debe crearse o recuperarse y luego configurarse.

Para otorgar acceso a investigadores sin que compren una llave, usar `grantKeys` desde la cuenta administradora del Lock. Enviar arrays paralelos —destinatarios, expiraciones y administradores de llave— con la misma cantidad y el mismo orden de elementos. Revisar todos los destinatarios antes de firmar; una llave perpetua no debe recibir una expiración accidental.

## Comprobar si el Lock ya existe

1. Abrir el dashboard de Unlock y conectar la wallet administradora.
2. Seleccionar la red correcta: Sepolia (demo actual), Base Sepolia (alternativa) o Avalanche C-Chain en producción.
3. Revisar **Locks / My Locks**. Si aparece el Lock de investigación, abrir sus detalles.
4. Copiar la dirección del contrato, no la dirección de la wallet administradora ni la de la fábrica.
5. Abrir esa dirección en el explorador de la misma red y confirmar que existe código de contrato:
   - Sepolia: `https://sepolia.etherscan.io/address/DIRECCION`.
   - Base Sepolia: `https://sepolia.basescan.org/address/DIRECCION`.
   - Avalanche C-Chain: `https://snowtrace.io/address/DIRECCION`.
6. Confirmar en el dashboard que precio, duración y oferta coinciden con la configuración anterior.
7. Añadir la dirección validada al entorno:

```bash
NEXT_PUBLIC_MUNAY_LOCK_ADDRESS=0x...
```

Reiniciar la aplicación después de cambiar variables públicas. Si el dashboard no muestra el Lock, verificar primero la cuenta conectada y la red; no crear otro hasta descartar que ya exista.

## Crear el Lock

Si no existe:

1. En el dashboard de Unlock, seleccionar la red objetivo.
2. Crear un Lock llamado, por ejemplo, **Munay Research**.
3. Configurar precio `0`, moneda nativa, duración `0` y oferta ilimitada.
4. Firmar la transacción con la wallet administradora.
5. Esperar confirmación, copiar la dirección del Lock y validarla en el explorador.
6. Completar `NEXT_PUBLIC_MUNAY_LOCK_ADDRESS`.

## Verificación del acceso

La verificación del servidor debe fallar de forma cerrada: ante error RPC, respuesta inválida, red equivocada o ausencia de llave, no entrega contenido protegido. Las respuestas de autorización y contenido sensible deben usar `Cache-Control: no-store`.

La demo actual confía en la dirección de wallet enviada por el cliente. Eso sirve para el prototipo, pero no demuestra que quien hace la solicitud controle esa wallet. En producción se requiere una firma de propiedad —preferiblemente SIWE—, con nonce de un solo uso, dominio, cadena, expiración y validación de firma en el servidor.
