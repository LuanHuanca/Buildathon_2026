# Guion de demo — 3 minutos

## 0:00–0:25 — El problema

**Pantalla:** Hero y mapa.

> Bolivia reconoce 36 naciones indígenas, pero gran parte de su investigación,
> memoria oral y conocimiento territorial sigue dependiendo de procesos que
> una persona común no puede verificar. Munay convierte apoyo, acceso y
> evidencia en una ruta pública.

No usar la cifra “70% se pierde” ni atribuir porcentajes administrativos sin
la fuente primaria exacta.

## 0:25–0:50 — Entrada sin fricción

**Pantalla:** botón “Entrar o conectar”; elegir Google.

> Una persona no necesita entender wallets para empezar. Entra con Google y
> Privy crea una wallet embebida. Quien ya usa Web3 conecta MetaMask.

## 0:50–1:25 — Unlock Protocol

**Pantalla:** proyecto, preview borroso, checkout y contenido abierto.

> El informe completo está protegido por una membresía de Unlock. En
> desarrollo vive en Base Sepolia; en producción el mismo flujo vive en
> Avalanche. El servidor no entrega el archivo hasta verificar una Key vigente.

Mostrar la dirección del Lock y su explorador.

## 1:25–2:05 — Donación en Avalanche

**Pantalla:** seleccionar 5 USDC, cambiar a Fuji, confirmar, abrir hash.

> La membresía no es la donación. El aporte es una transferencia USDC en una
> red Avalanche y llega a la wallet propia de la comunidad. El backend valida
> remitente, token, destino y monto antes de registrarlo.

## 2:05–2:35 — Impacto visible

**Pantalla:** mapa, investigadores, turismo y perfil.

> Munay conecta la campaña con quienes investigan y con rutas de turismo donde
> el porcentaje comunitario es explícito. El perfil reúne proyectos apoyados y
> hashes verificables.

Las fotografías y perfiles son contenido ilustrativo del prototipo.

## 2:35–3:00 — Cierre

**Pantalla:** CTA final y NetworkChip.

> Munay no pide confianza ciega. Pide explorar, apoyar y verificar. Unlock
> convierte investigación en membresía; Avalanche convierte cada aporte en
> evidencia pública.

# Guion de demo — 3 minutos

## Preparación

- Tener lista una cuenta de Google de prueba.
- Financiar la wallet embebida con ETH de Base Sepolia, AVAX Fuji y USDC Fuji.
- Confirmar que `NEXT_PUBLIC_MUNAY_LOCK_ADDRESS` contiene el Lock compartido real de Base Sepolia.
- Dejar abiertos BaseScan y Snowtrace.
- Usar datos verificables. No afirmar que existe una estadística de “70 %” si no hay una fuente real.

## 0:00–0:35 — Entrada sin fricción

“Munay conecta investigación, acceso y apoyo económico verificable.”

1. Pulsar **Continuar con Google**.
2. Mostrar que Privy crea o recupera una wallet embebida sin exigir una extensión.
3. Señalar brevemente la dirección de wallet.

## 0:35–1:10 — Vista previa protegida

1. Abrir una investigación.
2. Mostrar el resumen público y la sección difuminada.
3. Explicar: “El servidor comprueba una llave válida de Unlock. Si la comprobación falla, el contenido permanece cerrado y la respuesta no se almacena en caché.”

La demo confía en la dirección enviada por el cliente. Aclarar solo si preguntan: producción añadirá prueba firmada de control de wallet mediante SIWE.

## 1:10–1:50 — Llave gratuita y desbloqueo

1. Cambiar a Base Sepolia si la wallet lo solicita.
2. Obtener la llave gratuita del Lock compartido de investigación.
3. Esperar la confirmación.
4. Actualizar el estado y mostrar el contenido desbloqueado.

Mensaje: “La llave cuesta cero, usa el token nativo, es perpetua y el Lock admite oferta ilimitada. También podemos otorgar llaves a investigadores con `grantKeys`.”

Fallback si el indexador tarda:

- Abrir el hash en BaseScan y mostrar la transacción confirmada.
- Explicar que la indexación puede demorarse.
- Consultar o mostrar la validez on-chain y reintentar la actualización.
- No forzar visualmente el estado desbloqueado ni fingir una respuesta del indexador.

## 1:50–2:45 — Donación en USDC

1. Pulsar **Donar**.
2. Cambiar a Avalanche Fuji.
3. Elegir un importe pequeño en USDC y confirmar.
4. Mostrar el estado enviado y copiar el hash.
5. Abrir `https://testnet.snowtrace.io` con el hash.
6. Señalar remitente, destino, contrato USDC y cantidad.

Mensaje: “El acceso se prueba en Base Sepolia porque Unlock no está desplegado en Fuji. La donación ocurre en Avalanche Fuji con USDC de prueba; estos tokens no tienen valor.”

## 2:45–3:00 — Cierre

“La experiencia combina login familiar, wallet embebida, acceso verificable y una donación rastreable. En producción todo opera en Avalanche C-Chain: Unlock, USDC y exploración on-chain.”

Cerrar con el hash visible como evidencia, no con métricas no verificadas.

## Plan de contingencia

- Si Google falla: usar email o wallet, ambos habilitados en Privy.
- Si faltan fondos: mostrar saldos y hashes de una ejecución previa, indicando claramente que es un respaldo.
- Si la red no cambia: mostrar la red requerida y pedir el cambio manual.
- Si Unlock aún indexa: usar la evidencia on-chain y continuar con la donación.
- Si la donación falla: no inventar un hash; explicar el error de red, saldo o gas y mostrar una transacción previa identificada como tal.
