import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PedidoService } from '../../services/pedido.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosModel, Producto} from '../../models/productos.models';
import { categoriaProducto, categoriaProductoModel } from '../../models/categoria.models';
import { Asociacion } from 'src/app/models/asociaciones.models';
import { PedidoModel, Pedido} from '../../models/pedido.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario, UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';


//import { Person } from '../person';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
})

export class PedidoComponent implements OnInit, OnDestroy{

  // los datos se van guardando en un arreglo, el cual se usa para
  // desplegar la tabla
  personas:any[] = [];

  // los input del formulario se asocian con un modelo
  persona:any = {};



  guardar(){
    // se inserta el dato en el arreglo
    this.personas.push(this.persona);

    // se crea un nuevo objeto para almacenar nuevos datos
    this.persona = {};
  }


  @Input() pedido: any =null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  pedidos: Pedido[] = [];
  productos: Producto[] = [];
  productosForm: FormGroup;
  categorias: categoriaProducto[] = [];
  asociaciones: Asociacion[] = [];
  asociacion: any;
  pedidosForm: FormGroup;
  producto1: ProductosModel = new ProductosModel();
  pedido1: PedidoModel = new PedidoModel();
  categoria: categoriaProductoModel = new categoriaProductoModel();
  categoriaForm: FormGroup;
  usuarios: Usuario[] = [];
  usuario: UsuarioModel = new UsuarioModel();
  //pedidoUpdate: PedidoModel = new PedidoModel();

  

  constructor(
    private _auth: LoginService,
    private _router: Router,
    private _http: HttpClient,
    private _pedidoService:PedidoService,
    private _productosService: ProductosService,
    private activerouter:ActivatedRoute,
    private _userService: UsuarioService,
    private _builder: FormBuilder){
    this.pedidosForm = this._builder.group ({
      id_cli: ['',],
      fec_fac:['',],
      tot_fac: ['',],
      estado: ['',],
      detalle: ['',],
     });
     this.productosForm = this._builder.group({
      nombre: ['',Validators.required],
      descripcion: ['',],
    });
    this.categoriaForm = this._builder.group({
      nombre: ['', Validators.required],
      descripcion: ['',],
    });
   } 

  get errorCtrProducto() {
    return this.productosForm.controls;
  }
  get errorCtrCategoria() {
    return this.categoriaForm.controls;
  }

  ngOnInit(): void {

    this.productosForm = this._builder.group({
      id_cat: ['', Validators.required],
      aso_ps: ['', Validators.required],
      nom_pro: ['', Validators.required],
      desc_pro: ['',],
      uni_pro: ['', Validators.required],
      sto_pro: ['',],
      pvp_pro: ['', Validators.required],
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };

    this._pedidoService.getPedidos().subscribe((resp:any) => {
      this.pedidos = resp.factura;
      //console.log(this.pedidos);
      this.dtTrigger.next();
    });
    this._pedidoService.getProductos().subscribe((res:any) =>{
      this.productos= res.producto;
      //console.log(this.productos);
      this.dtTrigger.next();
    });
    this._userService.getUsers().subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
      //console.log(this.usuarios);
      this.dtTrigger.next();
    });
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  enviarProd(values) {
    // debugger;
    // if(values['nom_pro']=this.categoria.nombre){
    //     console.log(this.categoria._id);
    // }
    this.producto1.id_cat = values['id_cat'];
    // this.producto1.aso_ps = values['aso_ps'];
    this.producto1.aso_ps = this.asociacion._id;
    this.producto1.nom_pro = values['nom_pro'];
    this.producto1.desc_pro = values['desc_pro'];
    this.producto1.uni_pro = values['uni_pro'];
    this.producto1.sto_pro = values['sto_pro'];
    this.producto1.pvp_pro = values['pvp_pro'];
    this._productosService.addProductos(this.producto1).subscribe((resp: any) => {
      this.productos = resp.producto1;
      console.log(resp.productos);
      window.location.reload()

    }, (err) => {
      console.log(err);
    });
  }

  enviar(values){
    this.pedido1.id_cli = values['id_cli'];
    this.pedido1.fec_fac = values['fec_fac'];
    this.pedido1.tot_fac = values['tot_fac'];
    this.pedido1.estado = values['estado'];
    this.pedido1.detalle= [{
      _id: this.pedido1[0]._id, 
      cantidad: this.pedido1[0].cantidad = values['cantidad'], 
      subtotal: this.pedido1[0].subtotal = values['subtotal'],
      id_pro: values['id_pro']
    }]
    this._pedidoService.addPedido(this.pedido1).subscribe((resp:any) => {
      this.pedidos = resp.pedidos;
      console.log(resp.pedidos);
      window.location.reload();

    }, (err) => {

    });
  }

  enviarCategoria(values) {
    this.categoria.nombre = values['nombre'];
    this.categoria.descripcion = values['descripcion'];
    this._productosService.addCategoria(this.categoria).subscribe((resp: any) => {
      this.categorias = resp.categoria;
      console.log(resp.categorias);
      window.location.reload()

    }, (err) => {
      console.log(err);
    });
  }

  val1:number;
  val2:number;
  rta:number;
  
  operacion(){
    this.rta=this.val1*this.val2;
  }

  fecha(){
    var f = new Date();
    document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
  }


}
