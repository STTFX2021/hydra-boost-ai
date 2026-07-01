
## Contexto importante sobre GitHub

La integración GitHub de Lovable es **bidireccional y automática**. No puedo hacer `git fetch/checkout/pull` manualmente (los comandos git de estado están prohibidos en mi entorno). Lo que veo en el editor **ya es** el estado de la rama conectada. Si `hydrai-clean-v1` no es la rama activa vinculada al proyecto, tienes que cambiarla tú desde **Settings → GitHub → Branch** (o Account → Labs → GitHub Branch Switching si aún no está habilitado).

Revisado el estado actual: `src/App.tsx` **ya** monta la home nueva (Vozra + Vozra PID con Multilanguage/24-7/Múltiples llamadas/Máxima eficiencia + Creación web/Desarrollo web/Chatbots e IA/Automatización + claim "Herramientas diseñadas a medida…") y **no** carga globalmente `ExitIntentPopup`, `WhatsAppButton`, `ScrollProgressBar`, `MobileStickyCTA`, `MobileStickyAgentCTA` ni el chatbot antiguo. El requisito 8 y 9 ya están cumplidos en el código actualmente sincronizado.

## Plan

1. **Confirmar rama activa**
   - Verificar en `.git/HEAD` / metadatos disponibles si la rama vinculada es `hydrai-clean-v1`. Si no, avisarte para que la cambies desde Settings (yo no puedo hacerlo).

2. **Build de producción**
   - Ejecutar `npm ci` (o `npm install` si no hay lockfile alineado) y `npm run build`.
   - Registrar output.

3. **Corrección quirúrgica de errores de build**
   - Solo si el build falla: arreglar imports rotos, tipos, referencias a componentes eliminados. Nada de rediseño, textos, colores ni estructura.
   - Los componentes “legacy” (`ExitIntentPopup`, `WhatsAppButton`, `ScrollProgressBar`, etc.) permanecen en `src/components/ux/` como archivos pero **no** se importan desde `App.tsx`; los dejo tal cual salvo que rompan el build.

4. **Verificación de la home**
   - Confirmar que `/` renderiza la estructura listada (Vozra, Vozra PID + 4 features, 4 servicios, claim).
   - Confirmar que no hay popup/whatsapp/sticky/progress bar montados globalmente.

5. **Reporte final** (sin publicar)
   - Estado del build (pass/fail, tiempo, warnings).
   - Archivos modificados (idealmente 0).
   - Errores encontrados y cómo se corrigieron.
   - Nota sobre el estado de sincronización con `hydrai-clean-v1`.

## Fuera de alcance (explícito)

- No publicar / no deploy.
- No tocar textos, colores, secciones, componentes de la nueva home.
- No sustituir la home nueva por la anterior.
- No modificar formularios, edge functions, tracking, n8n, Supabase.
- No borrar archivos legacy salvo que rompan el build.

## Pregunta antes de ejecutar

¿Confirmas que **`hydrai-clean-v1` es la rama actualmente conectada** al proyecto en Settings → GitHub? Si no lo es, cámbiala primero — de lo contrario compilaré un estado distinto al que quieres validar.
