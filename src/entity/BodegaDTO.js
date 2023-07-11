var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Type, Transform } from 'class-transformer';
export class Bodega {
    constructor(nombre, id_res, estado, created_by, created_at) {
        this.nombre = nombre;
        this.id_responsable = id_res;
        this.estado = estado;
        this.created_by = created_by;
        this.created_at = created_at;
    }
}
__decorate([
    Expose({ name: "nombre_bodega" }),
    Type(() => String),
    __metadata("design:type", String)
], Bodega.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "id_res" }),
    Transform(({ value }) => parseInt(value), { toPlainOnly: true }),
    __metadata("design:type", Number)
], Bodega.prototype, "id_responsable", void 0);
__decorate([
    Expose({ name: "estado_bodega" }),
    Transform(({ value }) => parseInt(value), { toPlainOnly: true }),
    __metadata("design:type", Number)
], Bodega.prototype, "estado", void 0);
__decorate([
    Expose({ name: "created_by" }),
    Transform(({ value }) => parseInt(value), { toPlainOnly: true }),
    __metadata("design:type", Number)
], Bodega.prototype, "created_by", void 0);
__decorate([
    Expose({ name: "fecha_creacion" }),
    Type(() => String),
    __metadata("design:type", String)
], Bodega.prototype, "created_at", void 0);
