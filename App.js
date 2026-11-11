/* ============================================================
CATÁLOGO D1 — Versión Final (IA + Carrito + UX + Sensores)
Mejoras: Logo imagen + Chatbot flotante tipo Modal
============================================================ */
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  useWindowDimensions,
  View,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsistenteIA from './AsistenteIA';

const productos = [
  { id: '1', nombre: 'Leche Entera Latti', categoria: 'Lácteos', descripcion: 'Leche entera pasteurizada 1000ml', precio: '$3.100', imagen: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80' },
  { id: '2', nombre: 'Arroz Albar', categoria: 'Despensa', descripcion: 'Arroz estándar 500g', precio: '$1.650', imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80' },
  { id: '3', nombre: 'Huevos Sol Naciente', categoria: 'Huevos', descripcion: 'Huevo tipo AA x12', precio: '$7.490', imagen: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=200&q=80' },
  { id: '4', nombre: 'Pan Tajado Mantequilla', categoria: 'Panadería', descripcion: 'Pan tajado 450g', precio: '$3.850', imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
  { id: '5', nombre: 'Aceite Vegetal Imatá', categoria: 'Despensa', descripcion: 'Aceite vegetal 900ml', precio: '$6.750', imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80' },
  { id: '6', nombre: 'Azúcar Blanca', categoria: 'Despensa', descripcion: 'Azúcar blanca 1000g', precio: '$3.300', imagen: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=200&q=80' },
  { id: '7', nombre: 'Café Viejo Molino', categoria: 'Bebidas', descripcion: 'Café tostado y molido 125g', precio: '$5.700', imagen: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=200&q=80' },
  { id: '8', nombre: 'Chocolate De La Taza', categoria: 'Bebidas', descripcion: 'Chocolate de mesa 500g', precio: '$10.650', imagen: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&q=80' },
  { id: '9', nombre: 'Galletas Saltísimas', categoria: 'Snacks', descripcion: 'Galletas integrales 378g', precio: '$5.490', imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&q=80' },
  { id: '10', nombre: 'Spaghetti Doria', categoria: 'Despensa', descripcion: 'Pasta 250g + 10% extra', precio: '$2.100', imagen: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&q=80' },
  { id: '11', nombre: 'Atún El Navío', categoria: 'Enlatados', descripcion: 'Atún rallado en aceite 170g', precio: '$3.450', imagen: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200&q=80' },
  { id: '12', nombre: 'Frijol Rojo El Estío', categoria: 'Despensa', descripcion: 'Frijol rojo 500g', precio: '$3.690', imagen: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200&q=80' },
  { id: '13', nombre: 'Lenteja El Estío', categoria: 'Despensa', descripcion: 'Lentejas 500g', precio: '$1.590', imagen: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=200&q=80' },
  { id: '14', nombre: 'Sal Refisal', categoria: 'Despensa', descripcion: 'Sal refinada 1000g', precio: '$2.900', imagen: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=200&q=80' },
  { id: '15', nombre: 'Harina Quicksy', categoria: 'Despensa', descripcion: 'Harina de trigo 500g', precio: '$1.700', imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' },
];

export default function App() {
  const [pestana, setPestana] = useState('original');
  const [mostrarChatIA, setMostrarChatIA] = useState(false);
  // --- ESTADOS DEL FORMULARIO DE REGISTRO ---
  const [esRegistro, setEsRegistro] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  // ESTADOS DEL CARRITO
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const calcularTotal = () => {
    return carrito.reduce((total, prod) => {
      const precioNum = parseInt(prod.precio.replace(/[^0-9]/g, ''), 10);
      return total + (isNaN(precioNum) ? 0 : precioNum);
    }, 0);
  };

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  // --- ESTADOS DEL PERFIL Y LOGIN ---
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [nombreInput, setNombreInput] = useState('');
  const [historialCompras, setHistorialCompras] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const user = await AsyncStorage.getItem('@d1_usuario_completo');
        const historial = await AsyncStorage.getItem('@d1_historial');
        if (user) setUsuario(JSON.parse(user));
        if (historial) setHistorialCompras(JSON.parse(historial));
      } catch (e) {
        console.log('Error cargando datos', e);
      }
    };
    cargarDatos();
  }, []);

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim()) return Alert.alert('Error', 'Llena todos los campos');
    const usuarioGuardado = await AsyncStorage.getItem('@d1_usuario_completo');
    if (usuarioGuardado) {
      const userObj = JSON.parse(usuarioGuardado);
      if (userObj.correo === correo) {
        setUsuario(userObj);
      } else {
        Alert.alert('Error', 'Correo no registrado');
      }
    } else {
      Alert.alert('Error', 'No hay ninguna cuenta registrada con este correo.');
    }
  };

  const handleRegistro = async () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) return Alert.alert('Error', 'Llena los campos obligatorios');
    const nuevoUsuario = { nombre, apellido, telefono, direccion, correo };
    setUsuario(nuevoUsuario);
    await AsyncStorage.setItem('@d1_usuario_completo', JSON.stringify(nuevoUsuario));
    Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada exitosamente.');
  };

  const handleLogout = async () => {
    setUsuario(null);
  };

  const handlePagar = async () => {
    if (carrito.length === 0) return;
    if (!usuario) {
      return Alert.alert(
        'Inicia sesión',
        'Para poder finalizar tu compra, primero debes iniciar sesión o crear una cuenta.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a mi Perfil', onPress: () => { setMostrarCarrito(false); setMostrarPerfil(true); } }
        ]
      );
    }
    const nuevaCompra = {
      fecha: new Date().toLocaleDateString(),
      total: calcularTotal().toLocaleString('es-CO'),
      items: carrito.length
    };
    const nuevoHistorial = [...historialCompras, nuevaCompra];
    setHistorialCompras(nuevoHistorial);
    await AsyncStorage.setItem('@d1_historial', JSON.stringify(nuevoHistorial));
    setCarrito([]);
    setMostrarCarrito(false);
    Alert.alert('¡Compra exitosa!', 'Revisa tu historial en el Perfil.');
  };

  // --- PANTALLA DE MIS COMPRAS ---
  if (mostrarHistorial) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => setMostrarHistorial(false)} style={styles.botonVolverCarrito}>
            <Text style={styles.textoVolver}>← Volver al catálogo</Text>
          </Pressable>
          <Text style={styles.titulo}>Mis Compras</Text>
        </View>
        {historialCompras.length === 0 ? (
          <View style={styles.carritoVacio}>
            <Text style={{ fontSize: 40, marginBottom: 10 }}>🛒</Text>
            <Text style={styles.textoVacio}>Aún no tienes compras registradas.</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {historialCompras.slice().reverse().map((compra, index) => (
              <View key={index} style={styles.tarjetaHistorial}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.fechaHistorial}>📅 {compra.fecha}</Text>
                  <View style={{ backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                    <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 10 }}>COMPLETADA</Text>
                  </View>
                </View>
                <Text style={styles.totalHistorial}>Total: ${compra.total}</Text>
                <Text style={styles.itemsHistorial}>{compra.items} productos</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }

  // --- PANTALLA DE PERFIL Y LOGIN ---
  if (mostrarPerfil) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerLogin}>
          <Pressable onPress={() => {
            if (esRegistro) {
              setEsRegistro(false);
            } else {
              setMostrarPerfil(false);
            }
          }}>
            <Text style={{ fontSize: 24, color: '#1A1A1A', fontWeight: 'bold' }}>←</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.scrollLogin}>
          {usuario ? (
            <>
              <View style={styles.tarjetaPerfil}>
                <Text style={styles.saludoLogin}>¡Hola, {usuario.nombre}! 👋</Text>
                <Text style={styles.correoLogin}>📧 {usuario.correo}</Text>
                {usuario.telefono ? <Text style={styles.correoLogin}>📱 {usuario.telefono}</Text> : null}
                {usuario.direccion ? <Text style={styles.correoLogin}>🏠 {usuario.direccion}</Text> : null}
              </View>
              <View style={styles.resumenCompras}>
                <Text style={styles.textoResumenCompras}>🛍️ Tienes {historialCompras.length} compras realizadas.</Text>
                <Pressable onPress={() => { setMostrarPerfil(false); setMostrarHistorial(true); }}>
                  <Text style={styles.enlaceResumen}>Ver todas mis compras</Text>
                </Pressable>
              </View>
              <Pressable style={styles.botonCerrarSesion} onPress={handleLogout}>
                <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.tituloBienvenida}>
                {esRegistro ? 'Crear tu cuenta' : 'Bienvenido a D1'}
              </Text>
              <Text style={styles.subtituloBienvenida}>
                {esRegistro ? 'Ingresa tus datos para registrarte' : 'Ingresa tu correo y contraseña para continuar'}
              </Text>
              {esRegistro && (
                <>
                  <Text style={styles.labelInput}>Nombre*</Text>
                  <TextInput style={styles.inputD1} placeholder="Ej: Nombre" placeholderTextColor="#A0A0A0" value={nombre} onChangeText={setNombre} />
                  <Text style={styles.labelInput}>Apellido*</Text>
                  <TextInput style={styles.inputD1} placeholder="Ej: Apellido" placeholderTextColor="#A0A0A0" value={apellido} onChangeText={setApellido} />
                  <Text style={styles.labelInput}>Número de teléfono*</Text>
                  <TextInput style={styles.inputD1} placeholder="Ej: 3001234567" placeholderTextColor="#A0A0A0" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />
                  <Text style={styles.labelInput}>Dirección de entrega*</Text>
                  <TextInput style={styles.inputD1} placeholder="Ej: Calle 10 # 5-20" placeholderTextColor="#A0A0A0" value={direccion} onChangeText={setDireccion} />
                </>
              )}
              <Text style={styles.labelInput}>Correo electrónico*</Text>
              <TextInput style={styles.inputD1} placeholder="tucorreo@ejemplo.com" placeholderTextColor="#A0A0A0" keyboardType="email-address" autoCapitalize="none" value={correo} onChangeText={setCorreo} />
              <Text style={styles.labelInput}>Contraseña*</Text>
              <View style={styles.contenedorPassword}>
                <TextInput
                  style={{ flex: 1, padding: 15 }}
                  placeholder="Contraseña" placeholderTextColor="#A0A0A0"
                  secureTextEntry={!verPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable style={{ padding: 15 }} onPress={() => setVerPassword(!verPassword)}>
                  <Text style={{ fontSize: 18 }}>{verPassword ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
              <Text style={styles.avisoTerminos}>
                Al crear mi perfil, autorizo de manera previa, expresa e informada a D1 S.A.S. a tratar mis datos personales.
              </Text>
              <Pressable style={styles.botonRojoD1} onPress={esRegistro ? handleRegistro : handleLogin}>
                <Text style={styles.textoBotonRojo}>{esRegistro ? 'Registrarme' : 'Iniciar sesión'}</Text>
              </Pressable>
              <Pressable onPress={() => setEsRegistro(!esRegistro)} style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.textoEnlaceD1}>
                  {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿Es tu primera vez en D1? Crea tu cuenta'}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- PANTALLA DE CARRITO ---
  if (mostrarCarrito) {
    return (
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Pressable onPress={() => setMostrarCarrito(false)} style={styles.botonVolverCarrito}>
            <Text style={styles.textoVolver}>← Volver al catálogo</Text>
          </Pressable>
          <Text style={styles.titulo}>Mi Carrito</Text>
        </SafeAreaView>
        {carrito.length === 0 ? (
          <View style={styles.carritoVacio}>
            <Text style={styles.textoVacio}>Tu carrito está vacío 🛒</Text>
          </View>
        ) : (
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <FlatList
              data={carrito}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.tarjetaCarrito}>
                  <Image source={{ uri: item.imagen }} style={styles.imagenCarrito} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.nombre}>{item.nombre}</Text>
                    <Text style={styles.precioCarrito}>{item.precio}</Text>
                  </View>
                  <Pressable style={styles.botonEliminar} onPress={() => eliminarDelCarrito(index)}>
                    <Text style={styles.textoEliminar}>🗑️</Text>
                  </Pressable>
                </View>
              )}
            />
            <View style={styles.footerCarrito}>
              <Text style={styles.textoTotal}>
                Total: ${calcularTotal().toLocaleString('es-CO')}
              </Text>
              <Pressable style={styles.botonPagar} onPress={handlePagar}>
                <Text style={styles.textoPagar}>Pagar</Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }

  // --- CATÁLOGO PRINCIPAL ---
  return (
    <SafeAreaView style={styles.container}>
      {/* --- CABECERA ESTILO D1 --- */}
      <View style={styles.d1Header}>
        <View style={styles.d1FilaSuperior}>
          <View style={styles.d1Logo}>
            <Image source={require('./assets/logo-d1.png')} style={styles.logoImagen} />
          </View>
          <View style={styles.d1Buscador}>
            <Text style={styles.d1BuscadorTexto}>¿Qué estás buscando?</Text>
            <View style={styles.d1BuscadorIcono}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>🔍</Text>
            </View>
          </View>
          <Pressable style={styles.d1Carrito} onPress={() => setMostrarCarrito(true)}>
            <Text style={{ fontSize: 20 }}>🛒</Text>
            <Text style={styles.d1CarritoTexto}>${calcularTotal().toLocaleString('es-CO')}</Text>
          </Pressable>
        </View>
        <View style={styles.d1FilaInferior}>
          <Pressable style={styles.d1IconoNav}>
            <Text style={styles.d1Icono}>🏪</Text>
            <Text style={styles.d1IconoTexto}>Tiendas</Text>
          </Pressable>
          <Pressable style={styles.d1IconoNav} onPress={() => setMostrarHistorial(true)}>
            <Text style={styles.d1Icono}>📝</Text>
            <Text style={styles.d1IconoTexto}>Mis Compras</Text>
          </Pressable>
          <Pressable style={styles.d1IconoNav} onPress={() => setMostrarPerfil(true)}>
            <Text style={styles.d1Icono}>👤</Text>
            <Text style={styles.d1IconoTexto}>Perfil</Text>
          </Pressable>
        </View>
      </View>

      {/* Header original oculto (conservado) */}
      {false && (
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <Image source={require('./assets/logo-d1.png')} style={styles.logoImagenHeader} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.titulo}>Catálogo D1</Text>
            <Text style={styles.subtitulo}>Sesión 10 · IA Local + Carrito</Text>
          </View>
        </View>
      )}

      {/* --- Pestañas --- */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pestanasContainer}>
          {[
            { key: 'original', label: 'Original' },
            { key: 'optimizada', label: 'Optimizada' },
            { key: 'adaptativa', label: 'Adaptativa' },
            { key: 'sensores', label: 'Sensores' },
          ].map((tab) => (
            <Pressable
              key={tab.key}
              style={[styles.pestana, pestana === tab.key && styles.pestanaActiva]}
              onPress={() => setPestana(tab.key)}
            >
              <Text style={[styles.textoPestana, pestana === tab.key && styles.textoPestanaActiva]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Pantallas */}
      {pestana === 'original' && (
        <PantallaOriginal
          onAgregar={agregarAlCarrito}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />
      )}
      {pestana === 'optimizada' && <PantallaOptimizada onAgregar={agregarAlCarrito} />}
      {pestana === 'adaptativa' && <PantallaAdaptativa onAgregar={agregarAlCarrito} />}
      {pestana === 'sensores' && <PantallaSensores onAgregar={agregarAlCarrito} />}

      {/* --- BOTÓN FLOTANTE CHATBOT (FAB) --- */}
      <Pressable
        style={styles.fabChat}
        onPress={() => setMostrarChatIA(true)}
      >
        <Text style={styles.fabChatIcon}>🤖</Text>
      </Pressable>

      {/* --- MODAL CHATBOT FLOTANTE --- */}
      <Modal
        visible={mostrarChatIA}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMostrarChatIA(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderIzq}>
                <Image source={require('./assets/logo-d1.png')} style={styles.modalLogo} />
                <Text style={styles.modalTitulo}>Asistente D1</Text>
              </View>
              <Pressable onPress={() => setMostrarChatIA(false)} style={styles.modalCerrar}>
                <Text style={styles.modalCerrarTexto}>✕</Text>
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <AsistenteIA productos={productos} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- PANTALLA ORIGINAL ---
function PantallaOriginal({ onAgregar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];
  const productosFiltrados = categoriaActiva === 'Todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtrosContainer}>
          {categorias.map((cat) => (
            <Pressable
              key={cat}
              style={[styles.botonFiltro, categoriaActiva === cat && styles.botonFiltroActivo]}
              onPress={() => setCategoriaActiva(cat)}
            >
              <Text style={[styles.textoFiltro, categoriaActiva === cat && styles.textoFiltroActivo]}>
                {cat === 'Todos' ? '🛒 Todos' : cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContenido}
        renderItem={({ item }) => (
          <TarjetaProducto item={item} onAgregar={onAgregar} />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            No hay productos en esta categoría.
          </Text>
        }
      />
    </View>
  );
}

// --- PANTALLA OPTIMIZADA ---
function PantallaOptimizada({ onAgregar }) {
  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listaContenido}
      renderItem={({ item }) => (
        <View style={styles.tarjeta}>
          <View style={styles.tarjetaHeader}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>{item.precio}</Text>
          </View>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Pressable style={styles.botonAgregar} onPress={() => onAgregar(item)}>
            <Text style={styles.textoBotonAgregar}>+ Agregar al carrito</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

// --- PANTALLA ADAPTATIVA ---
function PantallaAdaptativa({ onAgregar }) {
  const { width } = useWindowDimensions();
  let columnas = 1;
  if (width >= 900) columnas = 3;
  else if (width >= 600) columnas = 2;
  const tipoDispositivo = width >= 900 ? 'Pantalla grande' : width >= 600 ? 'Tableta' : 'Teléfono';
  const esDispositivoGrande = width >= 600;

  return (
    <View style={styles.pantallaAdaptativa}>
      <View style={[styles.resumen, esDispositivoGrande && styles.resumenGrande]}>
        <View>
          <Text style={styles.tituloResumen}>Resumen del catálogo</Text>
          <Text style={styles.textoResumen}>Productos: {productos.length}</Text>
        </View>
        <View>
          <Text style={styles.textoResumen}>Dispositivo: {tipoDispositivo}</Text>
          <Text style={styles.textoResumen}>Columnas: {columnas}</Text>
        </View>
      </View>
      <Text style={styles.informacionPantalla}>
        Ancho: {Math.round(width)} px
      </Text>
      <FlatList
        key={`lista-${columnas}`}
        data={productos}
        numColumns={columnas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.tarjeta, styles.tarjetaAdaptativa]}>
            <View style={styles.tarjetaHeader}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>{item.precio}</Text>
            </View>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Pressable style={styles.botonAgregar} onPress={() => onAgregar(item)}>
              <Text style={styles.textoBotonAgregar}>+ Agregar</Text>
            </Pressable>
          </View>
        )}
        columnWrapperStyle={columnas > 1 ? styles.fila : undefined}
        contentContainerStyle={styles.listaContenido}
      />
    </View>
  );
}

// --- EXPLORACIÓN CÁMARA ---
function ExploracionCamara({ onCerrar }) {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const [frontal, setFrontal] = useState(false);
  const [error, setError] = useState('');
  const [solicitando, setSolicitando] = useState(false);

  async function solicitar() {
    setError('');
    setSolicitando(true);
    try {
      await pedirPermiso();
    } catch {
      setError('No se pudo solicitar el permiso.');
    } finally {
      setSolicitando(false);
    }
  }

  return (
    <ScrollView style={styles.panelCamara} contentContainerStyle={{ paddingBottom: 24 }}>
      <Pressable style={styles.botonSensor} onPress={onCerrar}>
        <Text style={styles.textoBotonSensor}>← Volver a Sensores</Text>
      </Pressable>
      <Text style={styles.tituloResumen}>Exploración de cámara</Text>
      <Text style={styles.aviso}>Solo vista previa. No toma ni guarda fotos.</Text>
      {!permiso ? (
        <Text style={styles.aviso}>Comprobando permiso...</Text>
      ) : !permiso.granted ? (
        <View>
          <Text style={styles.aviso}>
            {permiso.status === 'denied' ? 'Permiso denegado.' : 'Permiso pendiente.'}
          </Text>
          {permiso.canAskAgain && (
            <Pressable style={styles.botonSensor} disabled={solicitando} onPress={solicitar}>
              <Text style={styles.textoBotonSensor}>
                {solicitando ? 'Solicitando...' : 'Permitir cámara'}
              </Text>
            </Pressable>
          )}
        </View>
      ) : !error ? (
        <View>
          <Text style={styles.estadoSensor}>Permiso concedido</Text>
          <CameraView
            style={styles.camara}
            facing={frontal ? 'front' : 'back'}
            onMountError={() => setError('No se pudo abrir la cámara.')}
          />
          <Pressable style={styles.botonSensor} onPress={() => setFrontal(!frontal)}>
            <Text style={styles.textoBotonSensor}>Cambiar cámara</Text>
          </Pressable>
        </View>
      ) : null}
      {!!error && <Text style={styles.errorCamara}>{error}</Text>}
    </ScrollView>
  );
}

// --- PANTALLA SENSORES ---
function PantallaSensores({ onAgregar }) {
  const [datos, setDatos] = useState({ x: 0, y: 0, z: 0 });
  const [simulados, setSimulados] = useState({ x: 0, y: 0, z: 1 });
  const [modo, setModo] = useState('simulacion');
  const [estado, setEstado] = useState('Simulación: sin sensor físico');
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [agitaciones, setAgitaciones] = useState(0);
  const [ultimaAgitacion, setUltimaAgitacion] = useState(null);
  const [flashActivo, setFlashActivo] = useState(false);
  const [segundosUltima, setSegundosUltima] = useState(0);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [ultimoProducto, setUltimoProducto] = useState('');
  const ultimoConteoRef = useRef(0);

  const confirmarProducto = () => {
    const prod = productos[Math.floor(Math.random() * productos.length)];
    setUltimoProducto(prod.nombre);
    setAgitaciones((prev) => prev + 1);
    setUltimaAgitacion(Date.now());
    setFlashActivo(true);
    setMostrarToast(true);
    onAgregar(prod);
    setTimeout(() => setFlashActivo(false), 500);
    setTimeout(() => setMostrarToast(false), 2500);
  };

  useEffect(() => {
    if (modo !== 'real') {
      setEstado('Simulación: sin sensor físico');
      return;
    }
    let cancelado = false;
    let subscription;
    async function iniciar() {
      setEstado('Comprobando sensor y permiso...');
      setDatos({ x: 0, y: 0, z: 0 });
      try {
        if (Platform.OS === 'web') {
          setEstado('En web usa simulación. Prueba el sensor en Expo Go.');
          return;
        }
        const permiso = await Accelerometer.requestPermissionsAsync();
        if (cancelado) return;
        if (!permiso.granted) {
          setEstado('Permiso denegado. Usa simulación o botón manual.');
          return;
        }
        const disponible = await Accelerometer.isAvailableAsync();
        if (cancelado) return;
        if (!disponible) {
          setEstado('Sensor no disponible. Usa simulación.');
          return;
        }
        Accelerometer.setUpdateInterval(200);
        setEstado('Sensor activo');
        subscription = Accelerometer.addListener((data) => {
          if (cancelado) return;
          setDatos({ x: data.x, y: data.y, z: data.z });
          const magnitud = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
          const ahora = Date.now();
          if (magnitud > 2.2 && ahora - ultimoConteoRef.current > 1500) {
            ultimoConteoRef.current = ahora;
            confirmarProducto();
          }
        });
      } catch {
        if (!cancelado) setEstado('No se pudo iniciar el sensor. Usa simulación.');
      }
    }
    iniciar();
    return () => {
      cancelado = true;
      subscription?.remove();
    };
  }, [modo]);

  useEffect(() => {
    if (!ultimaAgitacion) return;
    const interval = setInterval(() => {
      setSegundosUltima(Math.floor((Date.now() - ultimaAgitacion) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [ultimaAgitacion]);

  if (mostrarCamara) {
    return <ExploracionCamara onCerrar={() => setMostrarCamara(false)} />;
  }

  const lectura = modo === 'real' ? datos : simulados;
  const hayLectura = modo === 'simulacion' || estado === 'Sensor activo';
  let posicion = 'Posición centrada';
  if (lectura.x > 0.5) posicion = 'Inclinado a la derecha';
  else if (lectura.x < -0.5) posicion = 'Inclinado a la izquierda';
  let colorFondo = '#E8F5E9';
  if (lectura.x > 0.5) colorFondo = '#FFEBEE';
  else if (lectura.x < -0.5) colorFondo = '#E3F2FD';

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.panelSensor}>
        <Text style={styles.tituloResumen}>Mi app siente el movimiento</Text>
        {modo !== 'real' && (
          <View style={styles.bannerAviso}>
            <Text style={styles.textoAvisoBanner}>⚠️ Estás en modo simulación.</Text>
            <Pressable style={styles.botonBanner} onPress={() => setModo('real')}>
              <Text style={styles.textoBotonBanner}>Activar sensor</Text>
            </Pressable>
          </View>
        )}
        <View style={styles.controlesSensor}>
          <Pressable style={[styles.botonSensor, modo === 'real' && styles.botonActivo]} onPress={() => setModo('real')}>
            <Text style={[styles.textoBotonSensor, modo === 'real' && styles.textoBotonActivo]}>Usar sensor real</Text>
          </Pressable>
          <Pressable style={[styles.botonSensor, modo === 'simulacion' && styles.botonActivo]} onPress={() => setModo('simulacion')}>
            <Text style={[styles.textoBotonSensor, modo === 'simulacion' && styles.textoBotonActivo]}>Usar simulación</Text>
          </Pressable>
        </View>
        <Text style={styles.estadoSensor}>{estado}</Text>
        <View style={[styles.tarjetaSensor, { backgroundColor: colorFondo }]}>
          <Text style={styles.nombre}>Lecturas en g</Text>
          <Text style={styles.lectura}>X: {hayLectura ? lectura.x.toFixed(2) : '--'}</Text>
          <Text style={styles.lectura}>Y: {hayLectura ? lectura.y.toFixed(2) : '--'}</Text>
          <Text style={styles.lectura}>Z: {hayLectura ? lectura.z.toFixed(2) : '--'}</Text>
          <Text style={styles.estadoSensor}>Estado: {hayLectura ? posicion : 'Sin lectura'}</Text>
        </View>
        <View style={[styles.tarjetaAgitacion, flashActivo && styles.tarjetaAgitacionFlash]}>
          <Text style={styles.tituloAgitacion}>📳 Confirmar con agitación</Text>
          <Text style={styles.contadorAgitaciones}>{agitaciones}</Text>
          <Text style={styles.etiquetaContador}>Productos confirmados</Text>
          <Text style={styles.estadoAgitacion}>
            {ultimaAgitacion ? `Último: ${ultimoProducto} (hace ${segundosUltima}s)` : 'Sin confirmaciones recientes'}
          </Text>
          <Pressable
            style={styles.botonReiniciar}
            onPress={() => {
              setAgitaciones(0);
              setUltimaAgitacion(null);
              setUltimoProducto('');
            }}
          >
            <Text style={styles.textoBotonReiniciar}>Reiniciar contador</Text>
          </Pressable>
          <Pressable style={styles.botonManual} onPress={confirmarProducto}>
            <Text style={styles.textoBotonManual}>Confirmar manualmente</Text>
          </Pressable>
        </View>
        {modo === 'simulacion' && (
          <View style={styles.controlesSensor}>
            <Pressable style={styles.botonSensor} onPress={() => setSimulados({ x: -0.8, y: 0, z: 1 })}>
              <Text style={styles.textoBotonSensor}>Simular izquierda</Text>
            </Pressable>
            <Pressable style={styles.botonSensor} onPress={() => setSimulados({ x: 0, y: 0, z: 1 })}>
              <Text style={styles.textoBotonSensor}>Centrar</Text>
            </Pressable>
            <Pressable style={styles.botonSensor} onPress={() => setSimulados({ x: 0.8, y: 0, z: 1 })}>
              <Text style={styles.textoBotonSensor}>Simular derecha</Text>
            </Pressable>
          </View>
        )}
        <Pressable style={[styles.botonSensor, styles.botonCamara]} onPress={() => setMostrarCamara(true)}>
          <Text style={styles.textoBotonCamara}>📷 Explorar cámara (opcional)</Text>
        </Pressable>
      </ScrollView>
      {mostrarToast && (
        <View style={styles.toastExito}>
          <Text style={styles.textoToast}>✅ ¡Producto agregado!</Text>
        </View>
      )}
    </View>
  );
}

// --- TARJETA DE PRODUCTO ---
function TarjetaProducto({ item, onAgregar }) {
  return (
    <View style={styles.tarjeta}>
      <Image source={{ uri: item.imagen }} style={styles.imagenProducto} />
      <View style={styles.categoriaBadge}>
        <Text style={styles.categoriaTexto}>{item.categoria}</Text>
      </View>
      <View style={styles.tarjetaHeader}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>{item.precio}</Text>
      </View>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Pressable style={styles.botonAgregar} onPress={() => onAgregar(item)}>
        <Text style={styles.textoBotonAgregar}>+ Agregar al carrito</Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 0, backgroundColor: '#F5F7FA' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingHorizontal: 20 },
  headerLogo: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#D32F2F', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerInfo: { flex: 1 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  subtitulo: { marginTop: 2, color: '#666', fontSize: 13 },
  carritoContenedor: { position: 'relative', padding: 10 },
  carritoIcono: { fontSize: 28 },
  carritoBadge: { position: 'absolute', top: 2, right: 0, backgroundColor: '#4CAF50', borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  carritoBadgeTexto: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  pestanasContainer: { paddingHorizontal: 20, paddingVertical: 10, gap: 8 },
  pestana: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#E5E9EF', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  pestanaActiva: { backgroundColor: '#D32F2F' },
  textoPestana: { color: '#4A5568', fontWeight: '600', fontSize: 13 },
  textoPestanaActiva: { color: 'white' },
  listaContenido: { paddingBottom: 30, paddingHorizontal: 20 },
  tarjeta: { marginTop: 12, padding: 16, backgroundColor: 'white', borderRadius: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tarjetaAdaptativa: { flex: 1, maxWidth: 400, marginHorizontal: 6 },
  tarjetaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nombre: { fontSize: 17, fontWeight: 'bold', color: '#1A1A1A', flex: 1 },
  descripcion: { marginTop: 6, color: '#666', fontSize: 13 },
  precio: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F', marginLeft: 12 },
  pantallaAdaptativa: { flex: 1, paddingHorizontal: 20 },
  informacionPantalla: { marginBottom: 8, fontWeight: '600', color: '#4A5568' },
  resumen: { backgroundColor: 'white', padding: 16, borderRadius: 14, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  resumenGrande: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tituloResumen: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, color: '#1A1A1A' },
  textoResumen: { color: '#4A5568', fontSize: 14 },
  fila: { gap: 12 },
  panelSensor: { paddingBottom: 40, paddingHorizontal: 20 },
  aviso: { marginVertical: 8, fontSize: 13, color: '#666', fontStyle: 'italic' },
  controlesSensor: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 },
  botonSensor: { paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#E5E9EF', borderRadius: 10 },
  botonActivo: { backgroundColor: '#D32F2F' },
  textoBotonSensor: { fontWeight: '600', color: '#4A5568' },
  textoBotonActivo: { color: 'white' },
  estadoSensor: { marginVertical: 8, color: '#D32F2F', fontWeight: '600' },
  lectura: { fontSize: 15, color: '#1A1A1A', marginTop: 2 },
  tarjetaSensor: { marginVertical: 10, padding: 16, borderRadius: 14 },
  tarjetaAgitacion: { marginTop: 16, padding: 20, backgroundColor: 'white', borderRadius: 16, borderWidth: 2, borderColor: '#E5E9EF', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  tarjetaAgitacionFlash: { backgroundColor: '#FFF176', borderColor: '#FBC02D' },
  tituloAgitacion: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  contadorAgitaciones: { fontSize: 56, fontWeight: 'bold', color: '#D32F2F', marginVertical: 4 },
  etiquetaContador: { fontSize: 13, color: '#666', marginBottom: 12 },
  estadoAgitacion: { fontSize: 14, color: '#4A5568', fontWeight: '600', marginBottom: 12 },
  botonReiniciar: { paddingVertical: 10, paddingHorizontal: 24, backgroundColor: '#1A1A1A', borderRadius: 10, marginBottom: 12 },
  textoBotonReiniciar: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  botonCamara: { marginTop: 16, backgroundColor: '#14304D' },
  textoBotonCamara: { color: 'white', fontWeight: '600' },
  panelCamara: { flex: 1, minHeight: 0, paddingHorizontal: 20 },
  camara: { height: 280, marginTop: 12, borderRadius: 12, overflow: 'hidden' },
  errorCamara: { marginTop: 12, color: '#C62828', fontWeight: '600' },
  bannerAviso: { backgroundColor: '#FFF3E0', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#FFB74D', marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  textoAvisoBanner: { color: '#E65100', fontWeight: 'bold', fontSize: 13, flex: 1 },
  botonBanner: { backgroundColor: '#E65100', padding: 8, borderRadius: 6, marginLeft: 10 },
  textoBotonBanner: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  botonManual: { marginTop: 10, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#E5E9EF', borderRadius: 8 },
  textoBotonManual: { color: '#4A5568', fontWeight: '600', fontSize: 13 },
  toastExito: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  textoToast: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  botonVolverCarrito: { paddingVertical: 10, paddingRight: 20 },
  textoVolver: { color: '#D32F2F', fontSize: 16, fontWeight: 'bold' },
  carritoVacio: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textoVacio: { fontSize: 18, color: '#666' },
  tarjetaCarrito: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 10 },
  precioCarrito: { fontSize: 14, color: '#666', marginTop: 4 },
  botonEliminar: { padding: 10, backgroundColor: '#FFEBEE', borderRadius: 8 },
  textoEliminar: { color: '#D32F2F', fontWeight: 'bold' },
  footerCarrito: { borderTopWidth: 1, borderColor: '#E5E9EF', paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textoTotal: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  botonPagar: { backgroundColor: '#4CAF50', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 10 },
  textoPagar: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  botonAgregar: { marginTop: 12, backgroundColor: '#E5E9EF', paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  textoBotonAgregar: { color: '#14304D', fontWeight: 'bold' },
  filtrosContainer: { paddingHorizontal: 20, gap: 8, paddingBottom: 5 },
  botonFiltro: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#E5E9EF', marginRight: 8 },
  botonFiltroActivo: { backgroundColor: '#D32F2F', borderColor: '#D32F2F' },
  textoFiltro: { fontSize: 14, color: '#4A5568', fontWeight: '600' },
  textoFiltroActivo: { color: 'white' },
  imagenCarrito: { width: 50, height: 50, borderRadius: 8, backgroundColor: '#f0f0f0' },

  /* --- CABECERA ESTILO D1 --- */
  d1Header: { backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E5E9EF', marginBottom: 10 },
  d1FilaSuperior: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10 },
  d1Logo: { backgroundColor: '#D32F2F', width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  d1Buscador: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7FA', borderRadius: 20, paddingLeft: 15, height: 40, justifyContent: 'space-between' },
  d1BuscadorTexto: { color: '#999', fontSize: 14 },
  d1BuscadorIcono: { backgroundColor: '#D32F2F', width: 35, height: 35, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 3 },
  d1Carrito: { alignItems: 'center', justifyContent: 'center' },
  d1CarritoTexto: { fontSize: 10, fontWeight: 'bold', color: '#D32F2F', marginTop: -2 },
  d1FilaInferior: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, borderTopWidth: 1, borderTopColor: '#E5E9EF', paddingTop: 10 },
  d1IconoNav: { alignItems: 'center' },
  d1Icono: { fontSize: 18, marginBottom: 2 },
  d1IconoTexto: { fontSize: 11, color: '#4A5568', fontWeight: '600' },

  /* --- LOGO IMAGEN --- */
  logoImagen: { width: 32, height: 32, resizeMode: 'contain' },
  logoImagenHeader: { width: 40, height: 40, resizeMode: 'contain' },

  /* --- FAB CHATBOT FLOTANTE --- */
  fabChat: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 100,
  },
  fabChatIcon: { fontSize: 28 },

  /* --- MODAL CHATBOT --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9EF',
  },
  modalHeaderIzq: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalLogo: { width: 32, height: 32, resizeMode: 'contain' },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  modalCerrar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCerrarTexto: { fontSize: 16, color: '#4A5568', fontWeight: 'bold' },
  modalBody: { flex: 1, maxHeight: '75%' },

  /* --- PERFIL --- */
  saludo: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10 },
  botonCerrarSesion: { backgroundColor: '#FFEBEE', padding: 10, borderRadius: 8, alignSelf: 'flex-start', marginTop: 10 },
  textoCerrarSesion: { color: '#D32F2F', fontWeight: 'bold' },
  tituloLogin: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputLogin: { backgroundColor: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 15 },
  botonLogin: { backgroundColor: '#D32F2F', padding: 15, borderRadius: 10, alignItems: 'center' },
  textoBotonLogin: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  subtituloHistorial: { fontSize: 20, fontWeight: 'bold', marginTop: 30, marginBottom: 15, color: '#1A1A1A' },
  tarjetaHistorial: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  fechaHistorial: { fontSize: 12, color: '#666', marginBottom: 5 },
  totalHistorial: { fontSize: 18, fontWeight: 'bold', color: '#D32F2F' },
  itemsHistorial: { fontSize: 14, color: '#4A5568', marginTop: 5 },

  /* --- LOGIN ESTILO D1 --- */
  headerLogin: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10 },
  scrollLogin: { paddingHorizontal: 20, paddingBottom: 40 },
  tituloBienvenida: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  subtituloBienvenida: { fontSize: 15, color: '#666', marginBottom: 25, lineHeight: 22 },
  labelInput: { fontSize: 14, color: '#1A1A1A', marginBottom: 8, fontWeight: '500' },
  inputD1: { borderWidth: 1, borderColor: '#ccc', borderRadius: 25, padding: 15, fontSize: 15, marginBottom: 18, backgroundColor: 'white' },
  contenedorPassword: { flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', borderRadius: 25, marginBottom: 18, backgroundColor: 'white', alignItems: 'center' },
  avisoTerminos: { fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 25 },
  botonRojoD1: { backgroundColor: '#D32F2F', padding: 16, borderRadius: 25, alignItems: 'center' },
  textoBotonRojo: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  textoEnlaceD1: { color: '#D32F2F', fontSize: 14, fontWeight: '600' },
  saludoLogin: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  correoLogin: { fontSize: 14, color: '#666', marginBottom: 15 },
  tarjetaPerfil: { backgroundColor: 'white', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  resumenCompras: { backgroundColor: '#E3F2FD', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#BBDEFB' },
  textoResumenCompras: { fontSize: 16, color: '#1976D2', fontWeight: 'bold', marginBottom: 10 },
  enlaceResumen: { fontSize: 14, color: '#D32F2F', fontWeight: 'bold', textDecorationLine: 'underline' },

  /* --- TARJETA PRODUCTO (imagen + badge) --- */
  imagenProducto: { width: '100%', height: 140, borderRadius: 10, marginBottom: 10, backgroundColor: '#f0f0f0' },
  categoriaBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#D32F2F', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  categoriaTexto: { color: 'white', fontSize: 11, fontWeight: 'bold' },
});