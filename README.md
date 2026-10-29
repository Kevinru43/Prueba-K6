**1. Prueba de Carga (Load Testing)**
Evalúa cómo responde el sistema ante el tráfico diario esperado bajo condiciones normales de uso.

export const options = {
  stages: [
    { duration: '1m', target: 50 },  // Ramp-up: Sube de 0 a 50 usuarios en 1 minuto
    { duration: '5m', target: 50 },  // Steady state: Mantiene 50 usuarios durante 5 minutos
    { duration: '1m', target: 0 },   // Ramp-down: Baja de 50 a 0 usuarios en 1 minuto
  ],
};

Qué estamos probando:
- Validar si los tiempos de respuesta del sistema se mantienen dentro de los rangos aceptables (SLA) bajo la carga habitual.
- Verificar el uso de CPU y memoria en el servidor durante la meseta de tráfico.
- Confirmar que no haya fugas de memoria (memory leaks) durante una ejecución sostenida.

**2. Prueba de Pico (Spike Testing)**
Simula un incremento repentino y masivo de tráfico en un intervalo de tiempo extremadamente corto, como en un evento de un CyberDay, la venta de entradas para un concierto o el envío de una notificación push.

export const options = {
  stages: [
    { duration: '10s', target: 10 },   // Carga inicial baja
    { duration: '10s', target: 500 },  // ¡Pico repentino! Salto a 500 usuarios en 10 segundos
    { duration: '1m',  target: 500 },  // Sostiene el pico por 1 minuto
    { duration: '10s', target: 10 },   // Cae drásticamente
    { duration: '30s', target: 0 },    // Cierre
  ],
};

Qué estamos probando:
- Analizar la capacidad de reacción inmediata de la infraestructura y ver si el servidor colapsa (crash) o responde con errores 500/504.
- Evaluar mecanismos de auto-escalado (por ejemplo, pods en Kubernetes o instancias en AWS) para ver qué tan rápido reaccionan.
- Verificar la capacidad de recuperación del sistema: comprobar si el sistema vuelve a operar con normalidad en cuanto la carga extrema disminuye.

**3. Prueba de Estrés (Stress Testing)**
Aumenta progresivamente la carga más allá del límite operativo normal para determinar el punto de quiebre (breaking point) de la aplicación.

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Rampa a carga habitual
    { duration: '3m', target: 100 },
    { duration: '2m', target: 200 }, // Sube por encima de lo normal
    { duration: '3m', target: 200 },
    { duration: '2m', target: 400 }, // Continúa sobrecargando el sistema
    { duration: '3m', target: 400 },
    { duration: '1m', target: 0 },   // Ramp-down
  ],
};

Qué estamos probando:
- Descubrir exactamente con cuántos usuarios concurrentes se degrada o cae la aplicación.
- Identificar los cuellos de botella primarios (por ejemplo, saturación de la base de datos, límites de hilos o memoria de la API).
- Evaluar si el sistema falla de manera controlada (graceful degradation) mostrando mensajes comprensibles o si colapsa completamente.