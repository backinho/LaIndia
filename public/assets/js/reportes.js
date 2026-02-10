// reportes.js - Sistema de generación de reportes PDF

class GeneradorReportes {
    constructor() {
        this.inicializarEventos();
        // Listener delegado para botones que se generan dinámicamente (por ejemplo en modales)
        if (typeof document !== 'undefined') {
            document.addEventListener('click', (e) => {
                const btn = e.target && e.target.closest && e.target.closest('#exportarMovimientosInventarioBtn');
                if (btn) this.exportarMovimientosInventario();
            });
        }
    }

    inicializarEventos() {
        const botones = [
            { id: 'exportarCategoriaBtn', handler: () => this.exportarCategorias() },
            { id: 'exportarClientesBtn', handler: () => this.exportarClientes() },
            { id: 'exportarHistorialBtn', handler: () => this.exportarHistorial() },
            { id: 'exportarMovimientosInventarioBtn', handler: () => this.exportarMovimientosInventario() },
            { id: 'exportarInventarioBtn', handler: () => this.exportarInventario() },
            { id: 'exportarUsuariosBtn', handler: () => this.exportarUsuarios() }
        ];

        botones.forEach(boton => {
            const elemento = document.getElementById(boton.id);
            if (elemento) {
                elemento.addEventListener('click', boton.handler);
            }
        });
    }

    obtenerFechaActual() {
        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();
        const hora = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
    }

    exportarCategorias() {
        const tabla = document.getElementById('categorias-table');
        if (!tabla) {
            console.error('Tabla de categorías no encontrada');
            return;
        }

        const filas = tabla.getElementsByTagName('tr');
        const datos = [];

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            if (celdas.length >= 5) {
                datos.push({
                    nombre: celdas[0].textContent.trim(),
                    codigo: celdas[1].textContent.trim(),
                    descripcion: celdas[2].textContent.trim(),
                    totalProductos: celdas[3].textContent.trim(),
                    estado: celdas[4].textContent.trim()
                });
            }
        }

        this.generarPDF({
            titulo: 'Reporte de Categorías',
            columnas: ['Nombre', 'Código', 'Descripción', 'Total Productos', 'Estado'],
            datos: datos.map(d => [d.nombre, d.codigo, d.descripcion, d.totalProductos, d.estado]),
            nombreArchivo: 'reporte_categorias.pdf'
        });
    }

    exportarClientes() {
        const tabla = document.getElementById('clientes-table');
        if (!tabla) {
            console.error('Tabla de clientes no encontrada');
            return;
        }

        const filas = tabla.getElementsByTagName('tr');
        const datos = [];

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            if (celdas.length >= 5) {
                datos.push({
                    nombre: celdas[0].textContent.trim(),
                    email: celdas[1].textContent.trim(),
                    telefono: celdas[2].textContent.trim(),
                    direccion: celdas[3].textContent.trim(),
                    estado: celdas[4].textContent.trim()
                });
            }
        }

        this.generarPDF({
            titulo: 'Reporte de Clientes',
            columnas: ['Nombre', 'Email', 'Teléfono', 'Dirección', 'Estado'],
            datos: datos.map(d => [d.nombre, d.email, d.telefono, d.direccion, d.estado]),
            nombreArchivo: 'reporte_clientes.pdf'
        });
    }

    exportarHistorial() {
        const tabla = document.getElementById('historial-table');
        if (!tabla) {
            console.error('Tabla de historial no encontrada');
            return;
        }

        const filas = tabla.getElementsByTagName('tr');
        const datos = [];

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            if (celdas.length >= 6) {
                datos.push({
                    fecha: celdas[0].textContent.trim(),
                    tipo: celdas[1].textContent.trim(),
                    productos: celdas[2].textContent.trim(),
                    usuario: celdas[3].textContent.trim(),
                    clienteProveedor: celdas[4].textContent.trim(),
                    valorTotal: celdas[5].textContent.trim()
                });
            }
        }

        this.generarPDF({
            titulo: 'Reporte de Historial de Movimientos',
            columnas: ['Fecha', 'Tipo', 'Productos', 'Usuario', 'Cliente/Proveedor', 'Valor Total'],
            datos: datos.map(d => [d.fecha, d.tipo, d.productos, d.usuario, d.clienteProveedor, d.valorTotal]),
            nombreArchivo: 'reporte_historial.pdf'
        });
    }

    exportarMovimientosInventario() {
        const btn = document.getElementById('exportarMovimientosInventarioBtn');
        if (!btn) {
            console.error('Botón exportarMovimientosInventarioBtn no encontrado');
            return;
        }

        const contenedor = btn.closest('.movimientos-producto') || document.querySelector('.movimientos-producto');
        if (!contenedor) {
            console.error('Contenedor de movimientos no encontrado');
            return;
        }

        // Intentar obtener el nombre del producto desde el bloque de detalles que suele estar justo antes
        let productoNombre = '';
        try {
            const posibleGrid = contenedor.previousElementSibling;
            if (posibleGrid && posibleGrid.classList && posibleGrid.classList.contains('producto-detalle-grid')) {
                const detalleItems = Array.from(posibleGrid.querySelectorAll('.detalle-item'));
                const nombreNodo = detalleItems.find(it => {
                    const label = it.querySelector('.detalle-label');
                    return label && label.textContent && label.textContent.trim().toLowerCase() === 'nombre';
                });
                if (nombreNodo) {
                    const valor = nombreNodo.querySelector('.detalle-value');
                    productoNombre = valor ? valor.textContent.trim() : '';
                }
            }
        } catch (e) {
            // silencioso
        }

        const items = Array.from(contenedor.querySelectorAll('.movimiento-item'));
        if (items.length === 0) {
            console.error('No se encontraron movimientos para exportar');
            return;
        }

        const filas = items.map(item => {
            const info = item.querySelector('.movimiento-item') || item;
            const spans = Array.from(info.querySelectorAll('span'));
            // Normalizar: [producto, cantidad, precio unitario, precio total, fecha]
            const textos = spans.map(s => s.textContent.trim());
            // Rellenar hasta 5 columnas si faltan
            while (textos.length < 5) textos.push('');
            return [textos[0] || '', textos[1] || '', textos[2] || '', textos[3] || '', textos[4] || ''];
        });

        this.generarPDF({
            titulo: `Reporte Movimientos (Inventario)${productoNombre ? ' - ' + productoNombre : ''}`,
            columnas: ['Detalle', 'Cantidad', 'Fecha', 'Usuario'],
            datos: filas,
            nombreArchivo: 'reporte_movimientos_inventario.pdf'
        });
    }

    exportarInventario() {
        const tabla = document.getElementById('inventario-full-table');
        if (!tabla) {
            console.error('Tabla de inventario no encontrada');
            return;
        }

        const filas = tabla.getElementsByTagName('tr');
        const datos = [];

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            if (celdas.length >= 6) {
                datos.push({
                    codigo: celdas[0].textContent.trim(),
                    producto: celdas[1].textContent.trim(),
                    categoria: celdas[2].textContent.trim(),
                    stock: celdas[3].textContent.trim(),
                    precio: celdas[4].textContent.trim(),
                    valorTotal: celdas[5].textContent.trim()
                });
            }
        }

        this.generarPDF({
            titulo: 'Reporte de Inventario de Productos',
            columnas: ['Código', 'Producto', 'Categoría', 'Stock', 'Precio', 'Valor Total'],
            datos: datos.map(d => [d.codigo, d.producto, d.categoria, d.stock, d.precio, d.valorTotal]),
            nombreArchivo: 'reporte_inventario.pdf'
        });
    }

    exportarUsuarios() {
        const tabla = document.getElementById('usuarios-table');
        if (!tabla) {
            console.error('Tabla de usuarios no encontrada');
            return;
        }

        const filas = tabla.getElementsByTagName('tr');
        const datos = [];

        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            if (celdas.length >= 5) {
                datos.push({
                    nombre: celdas[0].textContent.trim(),
                    email: celdas[1].textContent.trim(),
                    telefono: celdas[2].textContent.trim(),
                    rol: celdas[3].textContent.trim(),
                    estado: celdas[4].textContent.trim()
                });
            }
        }

        this.generarPDF({
            titulo: 'Reporte de Usuarios',
            columnas: ['Nombre', 'Email', 'Teléfono', 'Rol', 'Estado'],
            datos: datos.map(d => [d.nombre, d.email, d.telefono, d.rol, d.estado]),
            nombreArchivo: 'reporte_usuarios.pdf'
        });
    }

    generarPDF({ titulo, columnas, datos, nombreArchivo }) {
        const hasGlobalJsPDF = (typeof jsPDF !== 'undefined');
        const hasJspdfNamespace = (typeof window !== 'undefined' && typeof window.jspdf !== 'undefined' && typeof window.jspdf.jsPDF !== 'undefined');

        if (!hasGlobalJsPDF && !hasJspdfNamespace) {
            console.error('jsPDF no está cargado. Generando CSV alternativo...');
            this.generarCSV({ titulo, columnas, datos, nombreArchivo: nombreArchivo.replace('.pdf', '.csv') });
            return;
        }

        const doc = hasGlobalJsPDF ? new jsPDF() : new window.jspdf.jsPDF();
        const fechaGeneracion = this.obtenerFechaActual();

        const renderBody = (titleY) => {
            doc.setFontSize(18);
            doc.text(titulo, 14, titleY);

            doc.setFontSize(10);
            doc.text(`Fecha de generación: ${fechaGeneracion}`, 14, titleY + 8);
            doc.text(`Total de registros: ${datos.length}`, 14, titleY + 14);

            if (typeof doc.autoTable !== 'undefined') {
                doc.autoTable({
                    head: [columnas],
                    body: datos,
                    startY: titleY + 24,
                    styles: { fontSize: 8 },
                    headStyles: { fillColor: [41, 128, 185] }
                });
            } else {
                let yPos = titleY + 30;
                doc.setFontSize(8);

                columnas.forEach((col, i) => {
                    doc.text(col, 14 + (i * 35), yPos);
                });

                yPos += 7;
                datos.forEach((fila) => {
                    fila.forEach((celda, i) => {
                        const texto = String(celda).substring(0, 20);
                        doc.text(texto, 14 + (i * 35), yPos);
                    });
                    yPos += 5;
                    if (yPos > 280) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }

            doc.save(nombreArchivo);
            console.log(`Reporte generado: ${nombreArchivo}`);
        };

        // Dibujar membrete estilizado: fondo suave, logo a la izquierda, texto en columnas y línea separadora
        const imgEl = (typeof document !== 'undefined') ? document.querySelector('img[src*="fortextil.png"]') : null;
        const imgSrc = imgEl ? imgEl.src : '/LaIndia/public/assets/img/fortextil.png';

        const headerHeight = 40; // altura ocupada por el membrete (reducida)

        const drawHeaderWithImage = (imageSrc) => {
            try {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    try {
                        // fondo suave del membrete
                        doc.setFillColor(250, 250, 250);
                        doc.rect(12, 8, 186, headerHeight - 4, 'F');

                        // dibujar logo con altura acorde al tamaño de la tipografía del nombre
                        const imgH = 20;
                        const imgW = 20; // proporción 1:1 asumida
                        doc.addImage(img, 'PNG', 16, 14, imgW, imgH);

                        // texto de empresa a la derecha del logo (nombre grande)
                        const textX = 16 + imgW + 8;
                        doc.setFont('helvetica', 'bold');
                        doc.setFontSize(18);
                        doc.setTextColor(34, 67, 122);
                        doc.text('Proformes La India 2023 C.A', textX, 18);

                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(9);
                        doc.setTextColor(100, 100, 100);
                        doc.text('Av. Francisco de Miranda, 1ra Carrera, Edificio Mansour local #3 planta baja', textX, 26);
                        doc.text('Rif: J504529621', textX, 32);

                        // línea separadora
                        doc.setDrawColor(200);
                        doc.setLineWidth(0.5);
                        doc.line(12, 8 + headerHeight, 198, 8 + headerHeight);
                    } catch (e) {
                        // si algo falla con la imagen, dejamos solo el texto estilizado
                        doc.setFont('helvetica', 'bold');
                        doc.setFontSize(18);
                        doc.setTextColor(34, 67, 122);
                        doc.text('Proformes La India 2023 C.A', 14, 18);
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(9);
                        doc.setTextColor(100, 100, 100);
                        doc.text('Av. Francisco de Miranda, 1ra Carrera, Edificio Mansour local #3 planta baja', 14, 26);
                        doc.text('Rif: J504529621', 14, 32);
                        doc.setDrawColor(200);
                        doc.setLineWidth(0.5);
                        doc.line(12, 8 + headerHeight, 198, 8 + headerHeight);
                    }

                    // Renderizar el cuerpo empezando debajo del membrete
                    renderBody(8 + headerHeight + 12);
                };
                img.onerror = function() {
                    // solo texto si la imagen no carga
                    doc.setFillColor(250, 250, 250);
                    doc.rect(12, 8, 186, headerHeight - 4, 'F');

                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(18);
                    doc.setTextColor(34, 67, 122);
                    doc.text('Proformes La India 2023 C.A', 14, 18);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    doc.setTextColor(100, 100, 100);
                    doc.text('Av. Francisco de Miranda, 1ra Carrera, Edificio Mansour local #3 planta baja', 14, 26);
                    doc.text('Rif: J504529621', 14, 32);

                    doc.setDrawColor(200);
                    doc.setLineWidth(0.5);
                    doc.line(12, 8 + headerHeight, 198, 8 + headerHeight);

                    renderBody(8 + headerHeight + 12);
                };
                img.src = imageSrc;
            } catch (e) {
                doc.setFillColor(250, 250, 250);
                doc.rect(12, 8, 186, headerHeight - 4, 'F');

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(14);
                doc.setTextColor(34, 67, 122);
                doc.text('Proformes La India 2023 C.A', 14, 20);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                doc.text('Av. Francisco de Miranda, 1ra Carrera, Edificio Mansour local #3 planta baja', 14, 28);
                doc.text('Rif: J504529621', 14, 34);

                doc.setDrawColor(200);
                doc.setLineWidth(0.5);
                doc.line(12, 8 + headerHeight, 198, 8 + headerHeight);

                renderBody(8 + headerHeight + 12);
            }
        };

        // Intentar dibujar header con la imagen (o sin ella si falla)
        drawHeaderWithImage(imgSrc);
    }

    generarCSV({ titulo, columnas, datos, nombreArchivo }) {
        let contenido = `${titulo}\n`;
        contenido += `Fecha de generación: ${this.obtenerFechaActual()}\n`;
        contenido += `Total de registros: ${datos.length}\n\n`;

        contenido += columnas.join(',') + '\n';

        datos.forEach(fila => {
            const filaEscapada = fila.map(celda => {
                const texto = String(celda).replace(/"/g, '""');
                return texto.includes(',') ? `"${texto}"` : texto;
            });
            contenido += filaEscapada.join(',') + '\n';
        });

        const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', nombreArchivo);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Reporte CSV generado: ${nombreArchivo}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.reportes = new GeneradorReportes();
    console.log('Sistema de reportes inicializado');
});
