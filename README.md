# SDAP_TSJ
## Sistema Web de Detección y Apoyo Psicológico para Estudiantes de Nuevo Ingreso de TI (TSJ)

Este repositorio contiene el código fuente y la documentación técnica de un **sistema web** para la detección temprana de factores de riesgo psicológico y dificultades de adaptación en estudiantes de nuevo ingreso de carreras de Tecnologías de la Información del Tecnológico Superior de Jalisco (TSJ). 

## Descripción del proyecto

El sistema web integra instrumentos psicométricos validados (GAD‑7, PHQ‑9 y Cuestionario de Adaptación Bell‑Q) para que los estudiantes realicen autoevaluaciones en línea, obtengan retroalimentación inmediata y, en caso necesario, sean canalizados de forma eficiente y segura hacia servicios de apoyo psicológico institucionales o externos. 

Este proyecto responde a la alta prevalencia de síntomas de ansiedad, depresión y problemas de adaptación en estudiantes de educación superior en programas de TI, que se asocian con estrés académico, tecnoestrés, aislamiento social y riesgo de deserción en los primeros semestres. 

## Objetivos

### Objetivo general

Diseñar, desarrollar e implementar un sistema web para la detección temprana de factores de riesgo psicológico y dificultades de adaptación en estudiantes de nuevo ingreso de carreras de TI del TSJ, facilitando su canalización eficiente hacia apoyo profesional institucional o externo. 

### Objetivos específicos

- Analizar la prevalencia de factores de riesgo psicológico y dificultades de adaptación en estudiantes de nuevo ingreso de TI del TSJ.  
- Integrar en el sistema web los instrumentos GAD‑7, PHQ‑9 y el Cuestionario de Adaptación Bell‑Q con su lógica de puntuación automatizada.  
- Diseñar la arquitectura funcional y la interfaz de usuario, asegurando accesibilidad, usabilidad y confidencialidad.  
- Desarrollar módulos de autoevaluación, generación de resultados preliminares y reportes anonimizados. 
- Implementar un flujo de canalización segura hacia el área de psicología cuando se detecten niveles de riesgo.   
- Realizar pruebas piloto para validar funcionalidad, usabilidad e impacto en la detección temprana. 

## Alcance funcional del sistema

El sistema está orientado a dos tipos principales de usuario: estudiantes y personal de psicología/gestión académica. 

### Funciones para estudiantes

- Registro y autenticación de estudiantes (con manejo cuidadoso de datos personales).  
- Módulo de “Mi cuenta” para gestionar perfil básico. 
- Aplicación en línea de los cuestionarios GAD‑7, PHQ‑9 y Bell‑Q. 
- Cálculo automático de puntuaciones y clasificación en rangos de riesgo (bajo, moderado, alto).  
- Pantalla de resultados preliminares con interpretación básica y mensajes de orientación. 
- Módulo para solicitar apoyo y expresar interés en ser contactado por el área de psicología (con consentimiento informado). 

### Funciones para personal de psicología / administración

- Panel de reportes agregados y anonimizados (estadísticas de ansiedad, depresión y adaptación por rangos de riesgo).   
- Visualización de tendencias globales para apoyo a la toma de decisiones institucionales.  
- Sistema de notificaciones internas cuando un estudiante solicita apoyo. 

### Requisitos no funcionales relevantes

- Confidencialidad y seguridad de la información (manejo de datos sensibles de salud mental). 
- Usabilidad y accesibilidad para población estudiantil diversa.   
- Escalabilidad para múltiples unidades académicas del TSJ. 

## Arquitectura y componentes (propuesta para el repositorio)

La implementación concreta puede variar, pero el repositorio se organiza típicamente en los siguientes componentes lógicos: 

- `backend/`  
  - API para gestión de usuarios, cuestionarios, respuestas y reportes.  
  - Servicios de cálculo de puntuaciones GAD‑7, PHQ‑9 y Bell‑Q.  
  - Módulo de notificaciones y canalización.  

- `frontend/`  
  - Interfaces de estudiante (registro, autoevaluación, resultados, solicitud de apoyo).  
  - Interfaces de personal de psicología (panel de reportes, visualización de estadísticas).  

- `database/`  
  - Esquemas y migraciones para almacenamiento de resultados anonimizados y perfiles de usuario.  

- `docs/`  
  - Documentación técnica del sistema.  
  - Manuales breves para estudiantes y personal de psicología. 

En este README no se incluyen detalles administrativos (presupuesto, convocatorias, tablas internas) por ser específicos de la gestión institucional y no relevantes para el código fuente. 

## Metodología de desarrollo

Para la gestión y desarrollo del sistema se propone: 

- Uso de PRINCE2 como marco de gobernanza a nivel proyecto (roles, etapas y control).   
- Desarrollo ágil con Scrum, mediante iteraciones cortas e incrementales con retroalimentación continua de usuarios clave. 

En el contexto de este repositorio, esto se reflejará en:

- Uso de issues y milestones para gestionar backlog y sprints.  
- Ramas de características (`feature/*`) y revisiones por pull request.  

## Roadmap (metas técnicas principales)

Las metas técnicas del prototipo, resumidas y adaptadas al contexto del repositorio, son: 

1. **Meta 1 – Definición y diseño**  
   - Definición de flujo de usuario y requisitos funcionales.  
   - Diseño de base de datos para almacenar resultados anonimizados y perfiles de usuario.  
   - Wireframes básicos y diseño de pantallas principales. 

2. **Meta 2 – Autoevaluación y feedback preliminar**  
   - Implementación del módulo de autoevaluación con GAD‑7, PHQ‑9 y Bell‑Q.  
   - Lógica de puntuación automática y clasificación de riesgo.  
   - Pantallas de resultados preliminares con mensajes de orientación. 

3. **Meta 3 – Canalización y reportes**  
   - Módulo para que el estudiante solicite apoyo con consentimiento explícito.  
   - Panel de reportes agregados y anonimizados para psicología.  
   - Notificaciones para el personal cuando haya nuevas solicitudes de apoyo. 

4. **Meta 4 – Pruebas piloto y ajustes**  
   - Pruebas de usabilidad y corrección de errores con un grupo representativo de estudiantes.  
   - Ajustes funcionales y de interfaz según retroalimentación. 

## Impacto esperado

A nivel institucional y social, el sistema busca: 

- Reducir la deserción en carreras de TI mediante detección temprana de riesgo psicológico y dificultades de adaptación.  
- Mejorar el bienestar y el rendimiento académico de estudiantes de nuevo ingreso.  
- Optimizar el uso de recursos de apoyo psicológico mediante reportes agregados y priorización de casos.  
- Generar evidencia para futuras investigaciones y posibles extensiones del sistema a otras unidades académicas y contextos.  

## Cómo contribuir

Las contribuciones son bienvenidas, especialmente en las siguientes áreas:

- Mejora de la interfaz de usuario y experiencia de usuario.  
- Refuerzo de mecanismos de seguridad y privacidad de datos.  
- Optimización de rendimiento y escalabilidad.  
- Integración con otros servicios institucionales (p. ej., sistemas de tutorías o plataformas académicas).  

Antes de enviar un pull request:

1. Crea una rama a partir de `main` (por ejemplo, `feature/nueva-funcionalidad`).  
2. Asegúrate de que las pruebas pasen y de actualizar/añadir documentación cuando sea necesario.  
3. Abre un pull request describiendo claramente los cambios propuestos.

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

Copyright (c) 2026 León Miguel Ramos Corchado

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricción, incluyendo, sin limitación, los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, y a permitir a las personas a las que se les proporcione el Software que lo hagan, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE ENTREGA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES POR NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN CONTRACTUAL, AGRAVIO O CUALQUIER OTRA FORMA, QUE SURJA DE, O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN EL SOFTWARE.