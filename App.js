/* ============================================================
   CATÁLOGO D1 — Versión Final (IA + Carrito + UX + Sensores)
   Mejoras agregadas: Modo Oscuro + Notificaciones al pagar (Valery)
   ============================================================ */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated /* AGREGADO: Importacion necesaria para las animaciones de Gabriel */,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import AsistenteIA from "./AsistenteIA";

/* ------------------------------------------------------------
   NOTIFICACIONES
   Define cómo se muestran las alertas cuando la app está abierta.
   shouldShowAlert: muestra el aviso en pantalla
   shouldPlaySound: reproduce sonido
   shouldSetBadge: no modifica el contador del ícono
   ------------------------------------------------------------ */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const TIENDA_D1 = "Tienda D1";

const abrirMapa = () => {
  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(TIENDA_D1);
  Linking.openURL(url).catch((e) => console.log("No se pudo abrir el mapa", e));
};

const productos = [
<<<<<<< Updated upstream
  {
    id: "1",
    nombre: "Leche Entera Latti",
    categoria: "Lácteos",
    descripcion: "Leche entera pasteurizada 1000ml",
    precio: "$3.100",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/198962-1200-1200?v=639179630422500000&width=1200&height=1200&aspect=true",
  },
  {
    id: "2",
    nombre: "Arroz Albar",
    categoria: "Despensa",
    descripcion: "Arroz estándar 500g",
    precio: "$1.650",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/200594-1200-1200?v=639179664265570000&width=1200&height=1200&aspect=true",
  },
  {
    id: "3",
    nombre: "Huevos Sol Naciente",
    categoria: "Huevos",
    descripcion: "Huevo tipo AA x12",
    precio: "$7.490",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/199351-1200-1200?v=639179638216470000&width=1200&height=1200&aspect=true",
  },
  {
    id: "4",
    nombre: "Pan Tajado Mantequilla",
    categoria: "Panadería",
    descripcion: "Pan tajado 450g",
    precio: "$3.850",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/202462-1200-1200?v=639179728481330000&width=1200&height=1200&aspect=true",
  },
  {
    id: "5",
    nombre: "Aceite Vegetal Imatá",
    categoria: "Despensa",
    descripcion: "Aceite vegetal 900ml",
    precio: "$6.750",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/201946-1200-1200?v=639179698978470000&width=1200&height=1200&aspect=true",
  },
  {
    id: "6",
    nombre: "Azúcar Blanca",
    categoria: "Despensa",
    descripcion: "Azúcar blanca 1000g",
    precio: "$3.300",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/204384-1200-1200?v=639190439827730000&width=1200&height=1200&aspect=true",
  },
  {
    id: "7",
    nombre: "Café Viejo Molino",
    categoria: "Bebidas",
    descripcion: "Café tostado y molido 125g",
    precio: "$5.700",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/200598-1200-1200?v=639179664360900000&width=1200&height=1200&aspect=true",
  },
  {
    id: "8",
    nombre: "Chocolate De La Taza",
    categoria: "Bebidas",
    descripcion: "Chocolate de mesa 500g",
    precio: "$10.650",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/199885-1200-1200?v=639179648831400000&width=1200&height=1200&aspect=true",
  },
  {
    id: "9",
    nombre: "Galletas Saltísimas",
    categoria: "Snacks",
    descripcion: "Galletas integrales 378g",
    precio: "$5.490",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/202040-1200-1200?v=639179701430900000&width=1200&height=1200&aspect=true",
  },
  {
    id: "10",
    nombre: "Spaghetti Doria",
    categoria: "Despensa",
    descripcion: "Pasta 250g + 10% extra",
    precio: "$2.100",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/206437-1200-1200?v=639240370494200000&width=1200&height=1200&aspect=true",
  },
  {
    id: "11",
    nombre: "Atún El Navío",
    categoria: "Enlatados",
    descripcion: "Atún rallado en aceite 170g",
    precio: "$3.450",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/199584-1200-1200?v=639179642857870000&width=1200&height=1200&aspect=true",
  },
  {
    id: "12",
    nombre: "Frijol Rojo El Estío",
    categoria: "Despensa",
    descripcion: "Frijol rojo 500g",
    precio: "$3.690",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/205197-1200-1200?v=639202705383630000&width=1200&height=1200&aspect=true",
  },
  {
    id: "13",
    nombre: "Lenteja El Estío",
    categoria: "Despensa",
    descripcion: "Lentejas 500g",
    precio: "$1.590",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/198845-1200-1200?v=639179627775400000&width=1200&height=1200&aspect=true",
  },
  {
    id: "14",
    nombre: "Sal Refisal",
    categoria: "Despensa",
    descripcion: "Sal refinada 1000g",
    precio: "$2.900",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/200929-1200-1200?v=639179671225000000&width=1200&height=1200&aspect=true",
  },
  {
    id: "15",
    nombre: "Harina Quicksy",
    categoria: "Despensa",
    descripcion: "Harina de trigo 500g",
    precio: "$1.700",
    imagen:
      "https://d1tiendas.vtexassets.com/arquivos/ids/200172-1200-1200?v=639179655046300000&width=1200&height=1200&aspect=true",
  },
=======
  { id: '1', nombre: 'Leche Entera Latti', categoria: 'Lácteos', descripcion: 'Leche entera pasteurizada 1000ml', precio: '$3.100', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/198962-1200-1200?v=639179630422500000&width=1200&height=1200&aspect=true' },
  { id: '2', nombre: 'Arroz Albar', categoria: 'Despensa', descripcion: 'Arroz estándar 500g', precio: '$1.650', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/200594-1200-1200?v=639179664265570000&width=1200&height=1200&aspect=true' },
  { id: '3', nombre: 'Huevos Sol Naciente', categoria: 'Huevos', descripcion: 'Huevo tipo AA x12', precio: '$7.490', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/199351-1200-1200?v=639179638216470000&width=1200&height=1200&aspect=true' },
  { id: '4', nombre: 'Pan Tajado Mantequilla', categoria: 'Panadería', descripcion: 'Pan tajado 450g', precio: '$3.850', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/202462-1200-1200?v=639179728481330000&width=1200&height=1200&aspect=true' },
  { id: '5', nombre: 'Aceite Vegetal Imatá', categoria: 'Despensa', descripcion: 'Aceite vegetal 900ml', precio: '$6.750', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/201946-1200-1200?v=639179698978470000&width=1200&height=1200&aspect=true' },
  { id: '6', nombre: 'Azúcar Blanca', categoria: 'Despensa', descripcion: 'Azúcar blanca 1000g', precio: '$3.300', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/204384-1200-1200?v=639190439827730000&width=1200&height=1200&aspect=true' },
  { id: '7', nombre: 'Café Viejo Molino', categoria: 'Bebidas', descripcion: 'Café tostado y molido 125g', precio: '$5.700', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/200598-1200-1200?v=639179664360900000&width=1200&height=1200&aspect=true' },
  { id: '8', nombre: 'Chocolate De La Taza', categoria: 'Bebidas', descripcion: 'Chocolate de mesa 500g', precio: '$10.650', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/199885-1200-1200?v=639179648831400000&width=1200&height=1200&aspect=true' },
  { id: '9', nombre: 'Galletas Saltísimas', categoria: 'Snacks', descripcion: 'Galletas integrales 378g', precio: '$5.490', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/202040-1200-1200?v=639179701430900000&width=1200&height=1200&aspect=true' },
  { id: '10', nombre: 'Spaghetti Doria', categoria: 'Despensa', descripcion: 'Pasta 250g + 10% extra', precio: '$2.100', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/206437-1200-1200?v=639240370494200000&width=1200&height=1200&aspect=true' },
  { id: '11', nombre: 'Atún El Navío', categoria: 'Enlatados', descripcion: 'Atún rallado en aceite 170g', precio: '$3.450', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/199584-1200-1200?v=639179642857870000&width=1200&height=1200&aspect=true' },
  { id: '12', nombre: 'Frijol Rojo El Estío', categoria: 'Despensa', descripcion: 'Frijol rojo 500g', precio: '$3.690', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/205197-1200-1200?v=639202705383630000&width=1200&height=1200&aspect=true' },
  { id: '13', nombre: 'Lenteja El Estío', categoria: 'Despensa', descripcion: 'Lentejas 500g', precio: '$1.590', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/198845-1200-1200?v=639179627775400000&width=1200&height=1200&aspect=true' },
  { id: '14', nombre: 'Sal Refisal', categoria: 'Despensa', descripcion: 'Sal refinada 1000g', precio: '$2.900', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/200929-1200-1200?v=639179671225000000&width=1200&height=1200&aspect=true' },
  { id: '15', nombre: 'Harina Quicksy', categoria: 'Despensa', descripcion: 'Harina de trigo 500g', precio: '$1.700', imagen: 'https://d1tiendas.vtexassets.com/arquivos/ids/200172-1200-1200?v=639179655046300000&width=1200&height=1200&aspect=true' },
  { id: '16', nombre: 'Leche Deslactosada Alqueria', categoria: 'Lácteos', descripcion: 'Leche deslactosada entera 1000ml', precio: '$4.350', imagen: 'https://exitocol.vtexassets.com/arquivos/ids/35916424/Leche-Deslactosada-En-Caja-X-1-Litro-81933_a.jpg?v=639270711375430000' },
  { id: '17', nombre: 'Pan Tajado Blanco Bimbo', categoria: 'Panadería', descripcion: 'Pan blanco tajado grande 460g', precio: '$6.800', imagen: 'https://mercadomadrid.com.co/13622-superlarge_default_2x/pan-tajado-bimbo-blanco-grande-bolsa-600-gramos.jpg' },
  { id: '18', nombre: 'Huevos AA x 30', categoria: 'Huevos', descripcion: 'Cubeta de huevos AA x 30 unidades', precio: '$15.500', imagen: 'https://avinal.com.co/wp-content/uploads/2022/10/huevo-x30.png' },
  { id: '19', nombre: 'Aceite Girasol Premier', categoria: 'Despensa', descripcion: 'Aceite de girasol 1000ml', precio: '$9.200', imagen: 'https://exitocol.vteximg.com.br/arquivos/ids/26660337/Aceite-Premier-1000-ml-13556_a.jpg?v=638739827025100000' },
  { id: '20', nombre: 'Arroz Diana Premium', categoria: 'Despensa', descripcion: 'Arroz blanco premium 500g', precio: '$2.200', imagen: 'https://olimpica.vtexassets.com/arquivos/ids/866352/7702511000984.jpg?v=637910009116430000' },
  { id: '21', nombre: 'Jabón Rey en Polvo', categoria: 'Aseo', descripcion: 'Jabón en polvo para ropa 900g', precio: '$8.500', imagen: 'https://ultrex.com.co/wp-content/uploads/2019/06/DETER-POLV-ULTREX-FLORAL-900g.png' },
  { id: '22', nombre: 'Gaseosa Coca-Cola 1.5L', categoria: 'Bebidas', descripcion: 'Bebida gaseosa 1.5 litros', precio: '$5.200', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtQ46PyRpqInyVRgIwIZTfwP1ETH2xuhUfhPMOfwRjsqv5edbPtB2Zv0&s=10' },
  { id: '23', nombre: 'Café Sello Rojo Molido', categoria: 'Bebidas', descripcion: 'Café tostado y molido 500g', precio: '$12.400', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgLTflJvQWAlPgLoRRTcyWMllHcJjMcOnOAjoRbcNwYfqnF9iujr4-nNo&s=10' },
  { id: '24', nombre: 'Atún Van Camp\'s en Agua', categoria: 'Enlatados', descripcion: 'Atún en agua 170g', precio: '$4.800', imagen: 'https://exitocol.vteximg.com.br/arquivos/ids/37019504/Atun-Lomo-Agua-EXITO-MARCA-PROPIA-170-gr-3259113_a.jpg?v=639298508730870000' },
  { id: '25', nombre: 'Papel Higiénico Familia', categoria: 'Aseo', descripcion: 'Papel higiénico x 4 rollos', precio: '$7.900', imagen: 'https://exitocol.vtexassets.com/arquivos/ids/34408610/Papel-Acolchamax-Mega-FAMILIA-1184-mts-3373996_a.jpg?v=639211532076300000' },
  { id: '26', nombre: 'Pasta Dental Colgate', categoria: 'Aseo', descripcion: 'Crema dental Triple Acción 90g', precio: '$6.200', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyrJdA2Vesu44ntTDXojJ5GcrrzrNcsGvPXq2sNN4sg&s=10' },
  { id: '27', nombre: 'Galletas Festival', categoria: 'Snacks', descripcion: 'Galletas dulces x 12 unidades', precio: '$3.500', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlshdMR0bzMW65Tj4RLG11YRiaWaAdVQQ18NfEpC7Wcg&s=10' },
  { id: '28', nombre: 'Queso Campesino', categoria: 'Lácteos', descripcion: 'Queso campesino fresco 250g', precio: '$6.000', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSubG9T24b6zBWxI6YETlNR4H_bPrmrhYZ-D_SXdCfe7sawjWsbdGAbeWod&s=10' },
  { id: '29', nombre: 'Jugo de Naranja Hit', categoria: 'Bebidas', descripcion: 'Jugo de naranja 1000ml', precio: '$4.100', imagen: 'https://exitocol.vtexassets.com/arquivos/ids/34449787/Jugo-De-Naranja-843822_a.jpg?v=639213683788730000' },
  { id: '30', nombre: 'Limpiavidrios Windex', categoria: 'Aseo', descripcion: 'Limpiador de vidrios 400ml', precio: '$8.900', imagen: 'https://i5.walmartimages.cl/asr/ca49f522-3696-405b-9800-620acae6dc21.f59a84f7360645bfc7d0a9a8f0610891.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF' }
>>>>>>> Stashed changes
];

export default function App() {
  const [pestana, setPestana] = useState("original");
  const [mostrarChatIA, setMostrarChatIA] = useState(false);

  const [estaOnline, setEstaOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  const [esRegistro, setEsRegistro] = useState(false);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);
  const [mensajeCodigo, setMensajeCodigo] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [historialCompras, setHistorialCompras] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  /* AGREGADO: Estados para las nuevas pantallas de Perfil (Gabriel) */
  const [mostrarSoporte, setMostrarSoporte] = useState(false);
  const [mostrarAjustes, setMostrarAjustes] = useState(false);
  const [mensajeSoporte, setMensajeSoporte] = useState("");

  /* AGREGADO: Valor animado para el efecto de rebote en el carrito (Gabriel) */
  const escalaCarrito = useRef(new Animated.Value(1)).current;

  /* Valor animado para el salto del sol/luna al cambiar el tema */
  const escalaTema = useRef(new Animated.Value(1)).current;

  /* ------------------------------------------------------------
     MODO OSCURO
     temaOscuro: true = fondos oscuros y textos claros
     false = tema claro por defecto
     ------------------------------------------------------------ */
  const [temaOscuro, setTemaOscuro] = useState(false);

  /* ------------------------------------------------------------
     COLORES SEGÚN TEMA
     Paleta que se aplica a fondos, textos y headers
     según esté activo el modo oscuro o el claro.
     ------------------------------------------------------------ */
  const colores = temaOscuro
    ? {
        fondo: "#121212",
        tarjeta: "#1E1E1E",
        texto: "#FFFFFF",
        textoSec: "#B0B0B0",
        header: "#1A1A1A",
        borde: "#333333",
        acento: "#EF5350",
      }
    : {
        fondo: "#F5F7FA",
        tarjeta: "#FFFFFF",
        texto: "#1A1A1A",
        textoSec: "#666666",
        header: "#FFFFFF",
        borde: "#E5E9EF",
        acento: "#D32F2F",
      };

  const calcularTotal = () => {
    return carrito.reduce((total, prod) => {
      const precioNum = parseInt(prod.precio.replace(/[^0-9]/g, ""), 10);
      return total + (isNaN(precioNum) ? 0 : precioNum);
    }, 0);
  };

  const calcularDescuento = () =>
    descuentoAplicado ? Math.round(calcularTotal() * 0.1) : 0;
  const calcularTotalFinal = () => calcularTotal() - calcularDescuento();

  const aplicarCodigo = () => {
    if (codigoDescuento.trim().toUpperCase() === "D1DESCUENTO") {
      setDescuentoAplicado(true);
      setMensajeCodigo("✅ Código aplicado: 10% de descuento");
    } else {
      setDescuentoAplicado(false);
      setMensajeCodigo("❌ Código no válido");
    }
  };

  /* MODIFICADO: Funcion de agregar al carrito con animacion de rebote (Gabriel) */
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);

    Animated.sequence([
      Animated.timing(escalaCarrito, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(escalaCarrito, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const eliminarDelCarrito = (index) =>
    setCarrito((prev) => prev.filter((_, i) => i !== index));

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const user = await AsyncStorage.getItem("@d1_usuario_completo");
        if (user) {
          const userObj = JSON.parse(user);
          setUsuario(userObj);
          const historial = await AsyncStorage.getItem(
            `@d1_historial_${userObj.correo}`,
          );
          if (historial) {
            setHistorialCompras(JSON.parse(historial));
          } else {
            setHistorialCompras([]);
          }
        }
        // Restaura la preferencia de tema (oscuro/claro) guardada
        const tema = await AsyncStorage.getItem("@d1_tema_oscuro");
        if (tema !== null) setTemaOscuro(JSON.parse(tema));
      } catch (e) {
        console.log("Error cargando datos", e);
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    const alConectar = () => setEstaOnline(true);
    const alDesconectar = () => setEstaOnline(false);

    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("online", alConectar);
      window.addEventListener("offline", alDesconectar);
      return () => {
        window.removeEventListener("online", alConectar);
        window.removeEventListener("offline", alDesconectar);
      };
    }
  }, []);

  /* ------------------------------------------------------------
     PERMISO DE NOTIFICACIONES
     Se solicita una vez al abrir la app para poder
     mostrar el aviso de "Pedido confirmado".
     ------------------------------------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permiso de notificaciones denegado");
        }
      } catch (e) {
        console.log("Notificaciones no disponibles en este entorno", e);
      }
    })();
  }, []);

  /* ------------------------------------------------------------
     ALTERNAR TEMA
     Cambia entre modo claro y oscuro y guarda la preferencia
     en AsyncStorage para recordarla al reabrir la app.
     ------------------------------------------------------------ */
  const alternarTema = async () => {
    // Animación: el ícono (sol/luna) salta y vuelve
    Animated.sequence([
      Animated.timing(escalaTema, {
        toValue: 1.5,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(escalaTema, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    const nuevo = !temaOscuro;
    setTemaOscuro(nuevo);
    try {
      await AsyncStorage.setItem("@d1_tema_oscuro", JSON.stringify(nuevo));
    } catch (e) {
      console.log("No se pudo guardar el tema", e);
    }
  };

  /* ------------------------------------------------------------
     NOTIFICACIÓN AL PAGAR
     Envía una notificación local inmediata cuando el usuario
     completa una compra. trigger: null = se muestra al momento.
     ------------------------------------------------------------ */
  const enviarNotificacionPedido = async (total) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "✅ Pedido confirmado",
          body: `Tu compra por $${total} fue registrada. ¡Gracias por elegir D1!`,
          sound: true,
        },
        trigger: null,
      });
    } catch (e) {
      console.log("No se pudo enviar la notificación", e);
    }
  };

  const handleLogin = async () => {
    if (!correo.trim() || !password.trim())
      return Alert.alert("Error", "Llena todos los campos");
    try {
      const usuarioGuardado = await AsyncStorage.getItem(
        "@d1_usuario_completo",
      );
      if (usuarioGuardado) {
        const userObj = JSON.parse(usuarioGuardado);
        if (userObj.correo === correo && userObj.password === password) {
          const historialGuardado = await AsyncStorage.getItem(
            `@d1_historial_${userObj.correo}`,
          );
          if (historialGuardado) {
            setHistorialCompras(JSON.parse(historialGuardado));
          } else {
            setHistorialCompras([]);
          }
          setUsuario(userObj);
          setCorreo("");
          setPassword("");
          setMostrarPerfil(false);
        } else {
          Alert.alert("Error", "Correo o contraseña incorrectos");
        }
      } else {
        Alert.alert(
          "Error",
          "No hay ninguna cuenta registrada con este correo.",
        );
      }
    } catch (e) {
      console.log("Error al iniciar sesión:", e);
      Alert.alert("Error", "Ocurrió un problema al iniciar sesión.");
    }
  };

  const handleRegistro = async () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      return Alert.alert(
        "Error",
        "Llena los campos obligatorios (Nombre, Correo y Contraseña)",
      );
    }
    const nuevoUsuario = {
      nombre,
      apellido,
      telefono,
      direccion,
      correo,
      password,
    };
    await AsyncStorage.setItem(
      "@d1_usuario_completo",
      JSON.stringify(nuevoUsuario),
    );

    if (Platform.OS === "web") {
      window.alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
    } else {
      Alert.alert(
        "¡Registro exitoso!",
        "Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.",
      );
    }

    setNombre("");
    setApellido("");
    setTelefono("");
    setDireccion("");
    setCorreo("");
    setPassword("");
    setEsRegistro(false);
  };

  const handleLogout = async () => {
    setCodigoDescuento("");
    setDescuentoAplicado(false);
    setMensajeCodigo("");
    setUsuario(null);
    setHistorialCompras([]);
    setCorreo("");
    setPassword("");
    setNombre("");
    setApellido("");
    setTelefono("");
    setDireccion("");
  };

  const handlePagar = async () => {
    if (carrito.length === 0) return;

    if (!usuario) {
      if (Platform.OS === "web") {
        const irAlPerfil = window.confirm(
          "Para poder finalizar tu compra, primero debes iniciar sesión o crear una cuenta.\n\n¿Quieres ir a tu perfil ahora?",
        );
        if (irAlPerfil) {
          setMostrarCarrito(false);
          setMostrarPerfil(true);
        }
      } else {
        Alert.alert(
          "Inicia sesión",
          "Para poder finalizar tu compra, primero debes iniciar sesión o crear una cuenta.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Ir a mi Perfil",
              onPress: () => {
                setMostrarCarrito(false);
                setMostrarPerfil(true);
              },
            },
          ],
        );
      }
      return;
    }

    const nuevaCompra = {
      fecha: new Date().toLocaleDateString(),
      total: calcularTotalFinal().toLocaleString("es-CO"),
      items: carrito.length,
      productos: carrito,
    };

    const nuevoHistorial = [...historialCompras, nuevaCompra];
    setHistorialCompras(nuevoHistorial);
    await AsyncStorage.setItem(
      `@d1_historial_${usuario.correo}`,
      JSON.stringify(nuevoHistorial),
    );

    // Notificación local de pedido confirmado (usa el total ya calculado)
    await enviarNotificacionPedido(nuevaCompra.total);

    setCarrito([]);
    setMostrarCarrito(false);

    if (Platform.OS === "web") {
      window.alert("¡Compra exitosa! Revisa tu historial en el Perfil.");
    } else {
      Alert.alert("¡Compra exitosa!", "Revisa tu historial en el Perfil.");
    }
  };

  // --- PANTALLA DE MIS COMPRAS ---
  if (mostrarHistorial) {
    if (!usuario) {
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
          <View style={[styles.header, { marginTop: 40 }]}>
            <Pressable
              onPress={() => setMostrarHistorial(false)}
              style={styles.botonVolverCarrito}
            >
              <Text style={styles.textoVolver}>← Volver al catálogo</Text>
            </Pressable>
            <Text style={[styles.titulo, { color: colores.texto }]}>Mis Compras</Text>
          </View>
          <View style={styles.carritoVacio}>
            <Text style={{ fontSize: 40, marginBottom: 10 }}>🔒</Text>
            <Text style={styles.textoVacio}>
              Inicia sesión para ver tus compras.
            </Text>
            <Pressable
              style={[
                styles.botonRojoD1,
                { marginTop: 20, paddingHorizontal: 40 },
              ]}
              onPress={() => {
                setMostrarHistorial(false);
                setMostrarPerfil(true);
              }}
            >
              <Text style={styles.textoBotonRojo}>Ir a mi Perfil</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
        <View style={[styles.header, { marginTop: 40 }]}>
          <Pressable
            onPress={() => setMostrarHistorial(false)}
            style={styles.botonVolverCarrito}
          >
            <Text style={styles.textoVolver}>← Volver al catálogo</Text>
          </Pressable>
          <Text style={[styles.titulo, { color: colores.texto }]}>Mis Compras</Text>
        </View>
        {historialCompras.length === 0 ? (
          <View style={styles.carritoVacio}>
            <Text style={{ fontSize: 40, marginBottom: 10 }}>🛒</Text>
            <Text style={styles.textoVacio}>
              Aún no tienes compras registradas.
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ padding: 20, alignItems: "center" }}
          >
            <View style={{ width: "100%", maxWidth: 500 }}>
              {historialCompras
                .slice()
                .reverse()
                .map((compra, index) => (
                  <View key={index} style={styles.tarjetaHistorial}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.fechaHistorial}>
                        📅 {compra.fecha}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#E8F5E9",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: "#4CAF50",
                            fontWeight: "bold",
                            fontSize: 10,
                          }}
                        >
                          COMPLETADA
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.totalHistorial}>
                      Total: ${compra.total}
                    </Text>
                    <View
                      style={{
                        marginTop: 8,
                        borderTopWidth: 1,
                        borderColor: "#eee",
                        paddingTop: 8,
                      }}
                    >
                      {compra.productos &&
                        compra.productos.map((prod, i) => (
                          <Text
                            key={i}
                            style={{
                              fontSize: 13,
                              color: "#4A5568",
                              marginBottom: 2,
                            }}
                          >
                            • {prod.nombre} - {prod.precio}
                          </Text>
                        ))}
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }

  /* AGREGADO: Pantalla de Soporte Tecnico (Gabriel) */
  if (mostrarSoporte) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
        <View style={[styles.header, { marginTop: 40 }]}>
          <Pressable
            onPress={() => setMostrarSoporte(false)}
            style={styles.botonVolverCarrito}
          >
            <Text style={styles.textoVolver}>← Volver al Perfil</Text>
          </Pressable>
          <Text style={[styles.titulo, { color: colores.texto }]}>Soporte Técnico</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.labelInput}>
            Describe tu problema o consulta:
          </Text>
          <TextInput
            style={[
              styles.inputD1,
              { height: 150, textAlignVertical: "top", borderRadius: 15 },
            ]}
            placeholder="Escribe aquí tu mensaje..."
            placeholderTextColor="#A0A0A0"
            multiline
            value={mensajeSoporte}
            onChangeText={setMensajeSoporte}
          />
          <Pressable
            style={styles.botonRojoD1}
            onPress={() => {
              Alert.alert(
                "Mensaje enviado",
                "Nuestro equipo de soporte te contactará pronto.",
              );
              setMensajeSoporte("");
              setMostrarSoporte(false);
            }}
          >
            <Text style={styles.textoBotonRojo}>Enviar Mensaje</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* AGREGADO: Pantalla de Ajustes (Gabriel) */
  if (mostrarAjustes) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
        <View style={[styles.header, { marginTop: 40 }]}>
          <Pressable
            onPress={() => setMostrarAjustes(false)}
            style={styles.botonVolverCarrito}
          >
            <Text style={styles.textoVolver}>← Volver al Perfil</Text>
          </Pressable>
          <Text style={[styles.titulo, { color: colores.texto }]}>Ajustes</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.tarjetaPerfil}>
            <Text style={styles.nombre}>Configuración de la aplicación</Text>
            <View
              style={{
                marginTop: 15,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: "#E5E9EF",
              }}
            >
              <Text style={styles.descripcion}>Notificaciones push</Text>
              <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>
                Activadas
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: "#E5E9EF",
              }}
            >
              <Text style={styles.descripcion}>Idioma</Text>
              <Text style={{ color: "#1A1A1A", fontWeight: "bold" }}>
                Español
              </Text>
            </View>
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.descripcion}>Versión de la app</Text>
              <Text style={{ color: "#666" }}>1.0.0 (Final)</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (mostrarPerfil) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
        <View style={styles.headerLogin}>
          <Pressable
            onPress={() => {
              if (esRegistro) {
                setEsRegistro(false);
              } else {
                setMostrarPerfil(false);
              }
            }}
          >
            <Text
              style={{ fontSize: 24, color: "#1A1A1A", fontWeight: "bold" }}
            >
              ←
            </Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.scrollLogin}>
          {usuario ? (
            <>
              <View style={styles.tarjetaPerfil}>
                <Text style={styles.saludoLogin}>
                  ¡Hola, {usuario.nombre}! 👋
                </Text>
                <Text style={styles.correoLogin}>📧 {usuario.correo}</Text>
                {usuario.telefono ? (
                  <Text style={styles.correoLogin}>📱 {usuario.telefono}</Text>
                ) : null}
                {usuario.direccion ? (
                  <Text style={styles.correoLogin}>🏠 {usuario.direccion}</Text>
                ) : null}
              </View>

              <View style={styles.resumenCompras}>
                <Text style={styles.textoResumenCompras}>
                  🛍️ Tienes {historialCompras.length} compras realizadas.
                </Text>
                <Pressable
                  onPress={() => {
                    setMostrarPerfil(false);
                    setMostrarHistorial(true);
                  }}
                >
                  <Text style={styles.enlaceResumen}>
                    Ver todas mis compras
                  </Text>
                </Pressable>
              </View>

              {/* AGREGADO: Botones de Soporte y Ajustes en el Perfil (Gabriel) */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Pressable
                  style={[styles.botonRojoD1, { flex: 1, marginRight: 10 }]}
                  onPress={() => setMostrarSoporte(true)}
                >
                  <Text style={styles.textoBotonRojo}>Soporte Técnico</Text>
                </Pressable>
                <Pressable
                  style={[styles.botonRojoD1, { flex: 1, marginLeft: 10 }]}
                  onPress={() => setMostrarAjustes(true)}
                >
                  <Text style={styles.textoBotonRojo}>Ajustes</Text>
                </Pressable>
              </View>

              <Pressable
                style={styles.botonCerrarSesion}
                onPress={handleLogout}
              >
                <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.tituloBienvenida}>
                {esRegistro ? "Crear tu cuenta" : "Bienvenido a D1"}
              </Text>
              <Text style={styles.subtituloBienvenida}>
                {esRegistro
                  ? "Ingresa tus datos para registrarte"
                  : "Ingresa tu correo y contraseña para continuar"}
              </Text>
              {esRegistro && (
                <>
                  <Text style={styles.labelInput}>Nombre*</Text>
                  <TextInput
                    style={styles.inputD1}
                    placeholder="Ej: Nombre"
                    placeholderTextColor="#A0A0A0"
                    value={nombre}
                    onChangeText={setNombre}
                  />
                  <Text style={styles.labelInput}>Apellido*</Text>
                  <TextInput
                    style={styles.inputD1}
                    placeholder="Ej: Apellido"
                    placeholderTextColor="#A0A0A0"
                    value={apellido}
                    onChangeText={setApellido}
                  />
                  <Text style={styles.labelInput}>Número de teléfono*</Text>
                  <TextInput
                    style={styles.inputD1}
                    placeholder="Ej: 3001234567"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="phone-pad"
                    value={telefono}
                    onChangeText={setTelefono}
                  />
                  <Text style={styles.labelInput}>Dirección de entrega*</Text>
                  <TextInput
                    style={styles.inputD1}
                    placeholder="Ej: Calle 10 # 5-20"
                    placeholderTextColor="#A0A0A0"
                    value={direccion}
                    onChangeText={setDireccion}
                  />
                </>
              )}
              <Text style={styles.labelInput}>Correo electrónico*</Text>
              <TextInput
                style={styles.inputD1}
                placeholder="tucorreo@ejemplo.com"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
              />
              <Text style={styles.labelInput}>Contraseña*</Text>
              <View style={styles.contenedorPassword}>
                <TextInput
                  style={{ flex: 1, padding: 15 }}
                  placeholder="Contraseña"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={!verPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable
                  style={{ padding: 15 }}
                  onPress={() => setVerPassword(!verPassword)}
                >
                  <Text style={{ fontSize: 18 }}>
                    {verPassword ? "🙈" : "👁️"}
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.avisoTerminos}>
                Al crear mi perfil, autorizo de manera previa, expresa e
                informada a D1 S.A.S. a tratar mis datos personales.
              </Text>
              <Pressable
                style={styles.botonRojoD1}
                onPress={esRegistro ? handleRegistro : handleLogin}
              >
                <Text style={styles.textoBotonRojo}>
                  {esRegistro ? "Registrarme" : "Iniciar sesión"}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setEsRegistro(!esRegistro)}
                style={{ marginTop: 20, alignItems: "center" }}
              >
                <Text style={styles.textoEnlaceD1}>
                  {esRegistro
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿Es tu primera vez en D1? Crea tu cuenta"}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (mostrarCarrito) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
        <SafeAreaView style={styles.header}>
          <Pressable
            onPress={() => setMostrarCarrito(false)}
            style={styles.botonVolverCarrito}
          >
            <Text style={styles.textoVolver}>← Volver al catálogo</Text>
          </Pressable>
          <Text style={[styles.titulo, { color: colores.texto }]}>Mi Carrito</Text>
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
                  <Image
                    source={{ uri: item.imagen }}
                    style={styles.imagenCarrito}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.nombre}>{item.nombre}</Text>
                    <Text style={styles.precioCarrito}>{item.precio}</Text>
                  </View>
                  <Pressable
                    style={styles.botonEliminar}
                    onPress={() => eliminarDelCarrito(index)}
                  >
                    <Text style={styles.textoEliminar}>🗑️</Text>
                  </Pressable>
                </View>
              )}
            />
            <View style={styles.cajaDescuento}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TextInput
                  style={styles.inputDescuento}
                  placeholder="Código de descuento"
                  placeholderTextColor="#A0A0A0"
                  autoCapitalize="characters"
                  value={codigoDescuento}
                  onChangeText={setCodigoDescuento}
                />
                <Pressable style={styles.botonAplicar} onPress={aplicarCodigo}>
                  <Text style={styles.textoBotonAplicar}>Aplicar</Text>
                </Pressable>
              </View>
              {!!mensajeCodigo && (
                <Text
                  style={[
                    styles.mensajeCodigo,
                    { color: descuentoAplicado ? "#4CAF50" : "#D32F2F" },
                  ]}
                >
                  {mensajeCodigo}
                </Text>
              )}
            </View>
            <View style={styles.footerCarrito}>
              <View>
                {descuentoAplicado && (
                  <>
                    <Text style={styles.textoSubtotal}>
                      Subtotal: ${calcularTotal().toLocaleString("es-CO")}
                    </Text>
                    <Text style={styles.textoDescuento}>
                      Descuento 10%: -$
                      {calcularDescuento().toLocaleString("es-CO")}
                    </Text>
                  </>
                )}
                <Text style={styles.textoTotal}>
                  Total: ${calcularTotalFinal().toLocaleString("es-CO")}
                </Text>
              </View>
              {/* MODIFICADO: El texto del boton cambia dinamicamente si hay productos (Gabriel) */}
              <Pressable style={styles.botonPagar} onPress={handlePagar}>
                <Text style={styles.textoPagar}>
                  {carrito.length > 0 ? "Pagar" : "Agrega productos"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colores.fondo }]}>
      <View style={[styles.d1Header, { backgroundColor: colores.header, borderBottomColor: colores.borde }]}>
        <View style={styles.d1FilaSuperior}>
          <View style={styles.d1Logo}>
            <Text style={styles.d1LogoTexto}>D1</Text>
          </View>
          <View style={styles.d1Buscador}>
            <TextInput
              style={styles.d1BuscadorInput}
              placeholder="¿Qué estás buscando?"
              placeholderTextColor="#999"
              value={busqueda}
              onChangeText={setBusqueda}
            />
            <View style={styles.d1BuscadorIcono}>
              <Text style={{ color: "white", fontWeight: "bold" }}>🔍</Text>
            </View>
          </View>

          {/* MODIFICADO: Icono del carrito envuelto en Animated.View para el rebote (Gabriel) */}
          <Animated.View style={{ transform: [{ scale: escalaCarrito }] }}>
            <Pressable
              style={styles.d1Carrito}
              onPress={() => setMostrarCarrito(true)}
            >
              <Text style={{ fontSize: 20 }}>🛒</Text>
              <Text style={styles.d1CarritoTexto}>
                ${calcularTotal().toLocaleString("es-CO")}
              </Text>
            </Pressable>
          </Animated.View>

          {/* ------------------------------------------------------------
              MODO OSCURO (un solo botón)
              Al presionar, el sol/luna hace un salto (animación)
              y cambia el tema de toda la app (incluido Mis Compras).
              ------------------------------------------------------------ */}
          <Pressable onPress={alternarTema}>
            <Animated.View
              style={{
                marginLeft: 6,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: temaOscuro ? "#333333" : "#FFEBEE",
                borderWidth: 1,
                borderColor: temaOscuro ? "#555" : "#FFCDD2",
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale: escalaTema }],
              }}
            >
              <Text style={{ fontSize: 22 }}>
                {temaOscuro ? "☀️" : "🌙"}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: temaOscuro ? "#FFF" : "#D32F2F",
                }}
              >
                {temaOscuro ? "Claro" : "Oscuro"}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.d1FilaInferior}>
          <Pressable style={styles.d1IconoNav} onPress={abrirMapa}>
            <Text style={styles.d1Icono}>🏪</Text>
            <Text style={styles.d1IconoTexto}>Tiendas</Text>
          </Pressable>
          <Pressable
            style={styles.d1IconoNav}
            onPress={() => setMostrarHistorial(true)}
          >
            <Text style={styles.d1Icono}>📝</Text>
            <Text style={styles.d1IconoTexto}>Mis Compras</Text>
          </Pressable>
          <Pressable
            style={styles.d1IconoNav}
            onPress={() => setMostrarPerfil(true)}
          >
            <Text style={styles.d1Icono}>👤</Text>
            <Text style={styles.d1IconoTexto}>Perfil</Text>
          </Pressable>
        </View>
      </View>

      {!estaOnline && (
        <View
          style={{
            backgroundColor: "#FFF3E0",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#E65100", fontWeight: "bold", fontSize: 13 }}>
            📡 Sin conexión — modo offline activo
          </Text>
        </View>
      )}

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pestanasContainer}
        >
          {[
            { key: "original", label: "Original" },
            { key: "optimizada", label: "Optimizada" },
            { key: "adaptativa", label: "Adaptativa" },
            { key: "sensores", label: "Sensores" },
          ].map((tab) => (
            <Pressable
              key={tab.key}
              style={[
                styles.pestana,
                pestana === tab.key && styles.pestanaActiva,
              ]}
              onPress={() => setPestana(tab.key)}
            >
              <Text
                style={[
                  styles.textoPestana,
                  pestana === tab.key && styles.textoPestanaActiva,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {pestana === "original" && (
        <PantallaOriginal
          onAgregar={agregarAlCarrito}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          busqueda={busqueda}
        />
      )}
      {pestana === "optimizada" && (
        <PantallaOptimizada onAgregar={agregarAlCarrito} />
      )}
      {pestana === "adaptativa" && (
        <PantallaAdaptativa onAgregar={agregarAlCarrito} />
      )}
      {pestana === "sensores" && (
        <PantallaSensores onAgregar={agregarAlCarrito} />
      )}

      <Pressable style={styles.fabChat} onPress={() => setMostrarChatIA(true)}>
        <Text style={styles.fabChatIcon}>🤖</Text>
      </Pressable>

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
                <View style={styles.d1Logo}>
                  <Text style={styles.d1LogoTexto}>D1</Text>
                </View>
                <Text style={styles.modalTitulo}>Asistente D1</Text>
              </View>
              <Pressable
                onPress={() => setMostrarChatIA(false)}
                style={styles.modalCerrar}
              >
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

// --- COMPONENTES DE PANTALLA ---
// (El resto de los componentes PantallaOriginal, PantallaOptimizada, PantallaAdaptativa,
// ExploracionCamara, PantallaSensores y TarjetaProducto permanecen exactamente iguales)

function PantallaOriginal({ onAgregar, busqueda }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      categoriaActiva === "Todos" || p.categoria === categoriaActiva;
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda ? busqueda.toLowerCase() : "");
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosContainer}
        >
          {categorias.map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.botonFiltro,
                categoriaActiva === cat && styles.botonFiltroActivo,
              ]}
              onPress={() => setCategoriaActiva(cat)}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  categoriaActiva === cat && styles.textoFiltroActivo,
                ]}
              >
                {cat === "Todos" ? "🛒 Todos" : cat}
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
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No se encontraron productos.
          </Text>
        }
      />
    </View>
  );
}

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
          <Pressable
            style={styles.botonAgregar}
            onPress={() => onAgregar(item)}
          >
            <Text style={styles.textoBotonAgregar}>+ Agregar al carrito</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

function PantallaAdaptativa({ onAgregar }) {
  const { width } = useWindowDimensions();
  let columnas = 1;
  if (width >= 900) columnas = 3;
  else if (width >= 600) columnas = 2;
  const tipoDispositivo =
    width >= 900 ? "Pantalla grande" : width >= 600 ? "Tableta" : "Teléfono";
  const esDispositivoGrande = width >= 600;

  return (
    <View style={styles.pantallaAdaptativa}>
      <View
        style={[styles.resumen, esDispositivoGrande && styles.resumenGrande]}
      >
        <View>
          <Text style={styles.tituloResumen}>Resumen del catálogo</Text>
          <Text style={styles.textoResumen}>Productos: {productos.length}</Text>
        </View>
        <View>
          <Text style={styles.textoResumen}>
            Dispositivo: {tipoDispositivo}
          </Text>
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
            <Pressable
              style={styles.botonAgregar}
              onPress={() => onAgregar(item)}
            >
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

function ExploracionCamara({ onCerrar }) {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const [frontal, setFrontal] = useState(false);
  const [error, setError] = useState("");
  const [solicitando, setSolicitando] = useState(false);

  async function solicitar() {
    setError("");
    setSolicitando(true);
    try {
      await pedirPermiso();
    } catch {
      setError("No se pudo solicitar el permiso.");
    } finally {
      setSolicitando(false);
    }
  }

  return (
    <ScrollView
      style={styles.panelCamara}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Pressable style={styles.botonSensor} onPress={onCerrar}>
        <Text style={styles.textoBotonSensor}>← Volver a Sensores</Text>
      </Pressable>
      <Text style={styles.tituloResumen}>Exploración de cámara</Text>
      <Text style={styles.aviso}>
        Solo vista previa. No toma ni guarda fotos.
      </Text>
      {!permiso ? (
        <Text style={styles.aviso}>Comprobando permiso...</Text>
      ) : !permiso.granted ? (
        <View>
          <Text style={styles.aviso}>
            {permiso.status === "denied"
              ? "Permiso denegado."
              : "Permiso pendiente."}
          </Text>
          {permiso.canAskAgain && (
            <Pressable
              style={styles.botonSensor}
              disabled={solicitando}
              onPress={solicitar}
            >
              <Text style={styles.textoBotonSensor}>
                {solicitando ? "Solicitando..." : "Permitir cámara"}
              </Text>
            </Pressable>
          )}
        </View>
      ) : !error ? (
        <View>
          <Text style={styles.estadoSensor}>Permiso concedido</Text>
          <CameraView
            style={styles.camara}
            facing={frontal ? "front" : "back"}
            onMountError={() => setError("No se pudo abrir la cámara.")}
          />
          <Pressable
            style={styles.botonSensor}
            onPress={() => setFrontal(!frontal)}
          >
            <Text style={styles.textoBotonSensor}>Cambiar cámara</Text>
          </Pressable>
        </View>
      ) : null}
      {!!error && <Text style={styles.errorCamara}>{error}</Text>}
    </ScrollView>
  );
}

function PantallaSensores({ onAgregar }) {
  const [datos, setDatos] = useState({ x: 0, y: 0, z: 0 });
  const [simulados, setSimulados] = useState({ x: 0, y: 0, z: 1 });
  const [modo, setModo] = useState("simulacion");
  const [estado, setEstado] = useState("Simulación: sin sensor físico");
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [agitaciones, setAgitaciones] = useState(0);
  const [ultimaAgitacion, setUltimaAgitacion] = useState(null);
  const [flashActivo, setFlashActivo] = useState(false);
  const [segundosUltima, setSegundosUltima] = useState(0);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [ultimoProducto, setUltimoProducto] = useState("");
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
    if (modo !== "real") {
      setEstado("Simulación: sin sensor físico");
      return;
    }
    let cancelado = false;
    let subscription;
    async function iniciar() {
      setEstado("Comprobando sensor y permiso...");
      setDatos({ x: 0, y: 0, z: 0 });
      try {
        if (Platform.OS === "web") {
          setEstado("En web usa simulación. Prueba el sensor en Expo Go.");
          return;
        }
        const permiso = await Accelerometer.requestPermissionsAsync();
        if (cancelado) return;
        if (!permiso.granted) {
          setEstado("Permiso denegado. Usa simulación o botón manual.");
          return;
        }
        const disponible = await Accelerometer.isAvailableAsync();
        if (cancelado) return;
        if (!disponible) {
          setEstado("Sensor no disponible. Usa simulación.");
          return;
        }
        Accelerometer.setUpdateInterval(200);
        setEstado("Sensor activo");
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
        if (!cancelado)
          setEstado("No se pudo iniciar el sensor. Usa simulación.");
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

  const lectura = modo === "real" ? datos : simulados;
  const hayLectura = modo === "simulacion" || estado === "Sensor activo";
  let posicion = "Posición centrada";
  if (lectura.x > 0.5) posicion = "Inclinado a la derecha";
  else if (lectura.x < -0.5) posicion = "Inclinado a la izquierda";
  let colorFondo = "#E8F5E9";
  if (lectura.x > 0.5) colorFondo = "#FFEBEE";
  else if (lectura.x < -0.5) colorFondo = "#E3F2FD";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.panelSensor}>
        <Text style={styles.tituloResumen}>Mi app siente el movimiento</Text>
        {modo !== "real" && (
          <View style={styles.bannerAviso}>
            <Text style={styles.textoAvisoBanner}>
              ⚠️ Estás en modo simulación.
            </Text>
            <Pressable
              style={styles.botonBanner}
              onPress={() => setModo("real")}
            >
              <Text style={styles.textoBotonBanner}>Activar sensor</Text>
            </Pressable>
          </View>
        )}
        <View style={styles.controlesSensor}>
          <Pressable
            style={[styles.botonSensor, modo === "real" && styles.botonActivo]}
            onPress={() => setModo("real")}
          >
            <Text
              style={[
                styles.textoBotonSensor,
                modo === "real" && styles.textoBotonActivo,
              ]}
            >
              Usar sensor real
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.botonSensor,
              modo === "simulacion" && styles.botonActivo,
            ]}
            onPress={() => setModo("simulacion")}
          >
            <Text
              style={[
                styles.textoBotonSensor,
                modo === "simulacion" && styles.textoBotonActivo,
              ]}
            >
              Usar simulación
            </Text>
          </Pressable>
        </View>
        <Text style={styles.estadoSensor}>{estado}</Text>
        <View style={[styles.tarjetaSensor, { backgroundColor: colorFondo }]}>
          <Text style={styles.nombre}>Lecturas en g</Text>
          <Text style={styles.lectura}>
            X: {hayLectura ? lectura.x.toFixed(2) : "--"}
          </Text>
          <Text style={styles.lectura}>
            Y: {hayLectura ? lectura.y.toFixed(2) : "--"}
          </Text>
          <Text style={styles.lectura}>
            Z: {hayLectura ? lectura.z.toFixed(2) : "--"}
          </Text>
          <Text style={styles.estadoSensor}>
            Estado: {hayLectura ? posicion : "Sin lectura"}
          </Text>
        </View>
        <View
          style={[
            styles.tarjetaAgitacion,
            flashActivo && styles.tarjetaAgitacionFlash,
          ]}
        >
          <Text style={styles.tituloAgitacion}>📳 Confirmar con agitación</Text>
          <Text style={styles.contadorAgitaciones}>{agitaciones}</Text>
          <Text style={styles.etiquetaContador}>Productos confirmados</Text>
          <Text style={styles.estadoAgitacion}>
            {ultimaAgitacion
              ? `Último: ${ultimoProducto} (hace ${segundosUltima}s)`
              : "Sin confirmaciones recientes"}
          </Text>
          <Pressable
            style={styles.botonReiniciar}
            onPress={() => {
              setAgitaciones(0);
              setUltimaAgitacion(null);
              setUltimoProducto("");
            }}
          >
            <Text style={styles.textoBotonReiniciar}>Reiniciar contador</Text>
          </Pressable>
          <Pressable style={styles.botonManual} onPress={confirmarProducto}>
            <Text style={styles.textoBotonManual}>Confirmar manualmente</Text>
          </Pressable>
        </View>
        {modo === "simulacion" && (
          <View style={styles.controlesSensor}>
            <Pressable
              style={styles.botonSensor}
              onPress={() => setSimulados({ x: -0.8, y: 0, z: 1 })}
            >
              <Text style={styles.textoBotonSensor}>Simular izquierda</Text>
            </Pressable>
            <Pressable
              style={styles.botonSensor}
              onPress={() => setSimulados({ x: 0, y: 0, z: 1 })}
            >
              <Text style={styles.textoBotonSensor}>Centrar</Text>
            </Pressable>
            <Pressable
              style={styles.botonSensor}
              onPress={() => setSimulados({ x: 0.8, y: 0, z: 1 })}
            >
              <Text style={styles.textoBotonSensor}>Simular derecha</Text>
            </Pressable>
          </View>
        )}
        <Pressable
          style={[styles.botonSensor, styles.botonCamara]}
          onPress={() => setMostrarCamara(true)}
        >
          <Text style={styles.textoBotonCamara}>
            📷 Explorar cámara (opcional)
          </Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 0, backgroundColor: "#F5F7FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#1A1A1A" },
  textoVacio: { fontSize: 18, color: "#666" },
  carritoVacio: { flex: 1, justifyContent: "center", alignItems: "center" },

  pestanasContainer: { paddingHorizontal: 20, paddingVertical: 10, gap: 8 },
  pestana: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#E5E9EF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pestanaActiva: { backgroundColor: "#D32F2F" },
  textoPestana: { color: "#4A5568", fontWeight: "600", fontSize: 13 },
  textoPestanaActiva: { color: "white" },

  listaContenido: { paddingBottom: 30, paddingHorizontal: 20 },
  tarjeta: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tarjetaAdaptativa: { flex: 1, maxWidth: 400, marginHorizontal: 6 },
  tarjetaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nombre: { fontSize: 17, fontWeight: "bold", color: "#1A1A1A", flex: 1 },
  descripcion: { marginTop: 6, color: "#666", fontSize: 13 },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D32F2F",
    marginLeft: 12,
  },
  imagenProducto: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  categoriaBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#D32F2F",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoriaTexto: { color: "white", fontSize: 11, fontWeight: "bold" },
  botonAgregar: {
    marginTop: 12,
    backgroundColor: "#E5E9EF",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotonAgregar: { color: "#14304D", fontWeight: "bold" },

  filtrosContainer: { paddingHorizontal: 20, gap: 8, paddingBottom: 5 },
  botonFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E9EF",
    marginRight: 8,
  },
  botonFiltroActivo: { backgroundColor: "#D32F2F", borderColor: "#D32F2F" },
  textoFiltro: { fontSize: 14, color: "#4A5568", fontWeight: "600" },
  textoFiltroActivo: { color: "white" },

  pantallaAdaptativa: { flex: 1, paddingHorizontal: 20 },
  fila: { gap: 12 },
  resumen: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resumenGrande: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloResumen: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1A1A1A",
  },
  textoResumen: { color: "#4A5568", fontSize: 14 },
  informacionPantalla: { marginBottom: 8, fontWeight: "600", color: "#4A5568" },

  panelSensor: { paddingBottom: 40, paddingHorizontal: 20 },
  controlesSensor: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 10,
  },
  botonSensor: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#E5E9EF",
    borderRadius: 10,
  },
  botonActivo: { backgroundColor: "#D32F2F" },
  textoBotonSensor: { fontWeight: "600", color: "#4A5568" },
  textoBotonActivo: { color: "white" },
  estadoSensor: { marginVertical: 8, color: "#D32F2F", fontWeight: "600" },
  lectura: { fontSize: 15, color: "#1A1A1A", marginTop: 2 },
  tarjetaSensor: { marginVertical: 10, padding: 16, borderRadius: 14 },
  tarjetaAgitacion: {
    marginTop: 16,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E9EF",
    alignItems: "center",
  },
  tarjetaAgitacionFlash: { backgroundColor: "#FFF176", borderColor: "#FBC02D" },
  tituloAgitacion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  contadorAgitaciones: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#D32F2F",
    marginVertical: 4,
  },
  estadoAgitacion: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "600",
    marginBottom: 12,
  },
  botonReiniciar: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    marginBottom: 12,
  },
  textoBotonReiniciar: { color: "white", fontWeight: "bold", fontSize: 14 },
  botonCamara: { marginTop: 16, backgroundColor: "#14304D" },
  textoBotonCamara: { color: "white", fontWeight: "600" },
  panelCamara: { flex: 1, minHeight: 0, paddingHorizontal: 20, marginTop: 40 },
  camara: { height: 280, marginTop: 12, borderRadius: 12, overflow: "hidden" },
  botonManual: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E5E9EF",
    borderRadius: 8,
  },
  textoBotonManual: { color: "#4A5568", fontWeight: "600", fontSize: 13 },
  toastExito: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  textoToast: { color: "white", fontWeight: "bold", fontSize: 16 },

  botonVolverCarrito: { paddingVertical: 10, paddingRight: 20 },
  textoVolver: { color: "#D32F2F", fontSize: 16, fontWeight: "bold" },
  tarjetaCarrito: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  imagenCarrito: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  precioCarrito: { fontSize: 14, color: "#666", marginTop: 4 },
  botonEliminar: { padding: 10, backgroundColor: "#FFEBEE", borderRadius: 8 },
  textoEliminar: { color: "#D32F2F", fontWeight: "bold" },
  footerCarrito: {
    borderTopWidth: 1,
    borderColor: "#E5E9EF",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoTotal: { fontSize: 20, fontWeight: "bold", color: "#1A1A1A" },
  botonPagar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  textoPagar: { color: "white", fontWeight: "bold", fontSize: 16 },

  d1Header: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9EF",
    marginBottom: 10,
  },
  d1FilaSuperior: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
  },
  d1Logo: {
    backgroundColor: "#D32F2F",
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  d1LogoTexto: { color: "white", fontWeight: "bold", fontSize: 16 },
  d1Buscador: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 20,
    paddingLeft: 15,
    height: 40,
    justifyContent: "space-between",
  },
  d1BuscadorInput: {
    flex: 1,
    fontSize: 14,
    color: "#1A1A1A",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: "100%",
  },
  d1BuscadorIcono: {
    backgroundColor: "#D32F2F",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  d1Carrito: { alignItems: "center", justifyContent: "center" },
  d1CarritoTexto: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#D32F2F",
    marginTop: -2,
  },
  d1FilaInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E9EF",
    paddingTop: 10,
  },
  d1IconoNav: { alignItems: "center" },
  d1Icono: { fontSize: 18, marginBottom: 2 },
  d1IconoTexto: { fontSize: 11, color: "#4A5568", fontWeight: "600" },

  fabChat: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  fabChatIcon: { fontSize: 28 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "80%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9EF",
  },
  modalHeaderIzq: { flexDirection: "row", alignItems: "center", gap: 10 },
  modalTitulo: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },
  modalCerrar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCerrarTexto: { fontSize: 16, color: "#4A5568", fontWeight: "bold" },
  modalBody: { flex: 1 },

  headerLogin: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10 },
  scrollLogin: { paddingHorizontal: 20, paddingBottom: 40 },
  tituloBienvenida: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtituloBienvenida: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
    lineHeight: 22,
  },
  labelInput: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputD1: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    fontSize: 15,
    marginBottom: 18,
    backgroundColor: "white",
  },
  contenedorPassword: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 18,
    backgroundColor: "white",
    alignItems: "center",
  },
  avisoTerminos: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    marginBottom: 25,
  },
  botonRojoD1: {
    backgroundColor: "#D32F2F",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  textoBotonRojo: { color: "white", fontSize: 16, fontWeight: "bold" },
  textoEnlaceD1: { color: "#D32F2F", fontSize: 14, fontWeight: "600" },
  saludoLogin: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 5,
  },
  correoLogin: { fontSize: 14, color: "#666", marginBottom: 15 },
  tarjetaPerfil: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  resumenCompras: {
    backgroundColor: "#E3F2FD",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  textoResumenCompras: {
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "bold",
    marginBottom: 10,
  },
  enlaceResumen: {
    fontSize: 14,
    color: "#D32F2F",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  botonCerrarSesion: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  textoCerrarSesion: { color: "#D32F2F", fontWeight: "bold" },

  tarjetaHistorial: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    width: "100%",
    alignSelf: "center",
  },
  fechaHistorial: { fontSize: 12, color: "#666", marginBottom: 5 },
  totalHistorial: { fontSize: 18, fontWeight: "bold", color: "#D32F2F" },
  itemsHistorial: { fontSize: 14, color: "#4A5568", marginTop: 5 },

  cajaDescuento: { paddingVertical: 12 },
  inputDescuento: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    fontSize: 14,
  },
  botonAplicar: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
  },
  textoBotonAplicar: { color: "white", fontWeight: "bold" },
  mensajeCodigo: { marginTop: 6, fontSize: 13, fontWeight: "600" },
  textoSubtotal: { fontSize: 14, color: "#666" },
  textoDescuento: { fontSize: 14, color: "#4CAF50", fontWeight: "600" },
});
