'use client';
import type { FormEvent } from 'react'; import type { UserRole } from '@/types/crm';
type Props={open:boolean;onClose:()=>void;onSubmit:(e:FormEvent)=>void;name:string;email:string;role:UserRole;phone:string;cedula:string;setName:(v:string)=>void;setEmail:(v:string)=>void;setRole:(v:UserRole)=>void;setPhone:(v:string)=>void;setCedula:(v:string)=>void};
export function NewUserModal(p:Props){if(!p.open)return null; const {onSubmit:handleCreateUser,name:newUserName,email:newUserEmail,role:newUserRole,phone:newUserPhone,cedula:newUserCedula,setName:setNewUserName,setEmail:setNewUserEmail,setRole:setNewUserRole,setPhone:setNewUserPhone,setCedula:setNewUserCedula}=p; const setShowNewUserModal=(_value?: boolean)=>p.onClose(); return <>

      
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1A12] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <h3 className="font-serif text-lg font-bold text-white">
                Alta de Personal Corporativo
              </h3>
              <button
                onClick={() => setShowNewUserModal(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Diana Santillán"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">
                  Correo Corporativo *
                </label>
                <input
                  type="email"
                  required
                  placeholder="diana.concierge@vermilionroutes.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">
                  Rol Departamental *
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white"
                >
                  <option value="operator">Operador Logístico / Guía</option>
                  <option value="sales">Ventas / Travel Designer</option>
                  <option value="financial">Finanzas & Pagos</option>
                  <option value="concierge">Concierge & Huéspedes</option>
                  <option value="admin">Administrador Operativo</option>
                  <option value="editor">Editor de Contenidos (cPanel)</option>
                  <option value="super">Super Administrador</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">
                    Cédula / Pasaporte
                  </label>
                  <input
                    type="text"
                    placeholder="172819201"
                    value={newUserCedula}
                    onChange={(e) => setNewUserCedula(e.target.value)}
                    className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+593 99..."
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold uppercase tracking-wider text-xs shadow-lg mt-2 cursor-pointer"
              >
                Crear Cuenta en Firestore
              </button>
            </form>
          </div>
        </div>
      
</>}
