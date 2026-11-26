'use client';
import type { CrmBooking } from '@/types/crm';
type Target={ booking: CrmBooking; type: 'affiliate' | 'operator' };
type Props={ target: Target | null; payoutMethod:string; payoutReference:string; onMethodChange:(v:string)=>void; onReferenceChange:(v:string)=>void; onClose:()=>void; onProcess:()=>void };
export function PayoutModal({target,payoutMethod,payoutReference,onMethodChange,onReferenceChange,onClose,onProcess}:Props){ if(!target)return null; const payoutModalTarget=target; const setPayoutMethod=onMethodChange; const setPayoutReference=onReferenceChange; const handleProcessPayout=onProcess; const setPayoutModalTarget=(_value?: Target | null)=>onClose(); return <>

      
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0B1A12] border border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950">
              <h3 className="font-serif text-lg font-bold text-white">
                Dispersión de Pago Bancario
              </h3>
              <button
                onClick={() => setPayoutModalTarget(null)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-950 space-y-1">
                <span className="text-zinc-400 text-[10px] font-mono block">
                  BENEFICIARIO:
                </span>
                <p className="text-white font-bold">
                  {payoutModalTarget.booking.customerName} (Ref:{" "}
                  {payoutModalTarget.booking.bookingCode})
                </p>
                <p className="text-amber-400 font-mono font-extrabold text-base">
                  $
                  {payoutModalTarget.type === "affiliate"
                    ? payoutModalTarget.booking.affiliateCommissionAmount
                    : payoutModalTarget.booking.operatorCommissionAmount}{" "}
                  USD
                </p>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">
                  Método de Transferencia:
                </label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2 text-white"
                >
                  <option value="Banco Pichincha">
                    Banco Pichincha (Transferencia Directa)
                  </option>
                  <option value="Produbanco">
                    Produbanco / Grupo Promerica
                  </option>
                  <option value="Zelle">Zelle (USD)</option>
                  <option value="Wire Transfer">
                    Transferencia Internacional SWIFT
                  </option>
                  <option value="PayPal">PayPal Business</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">
                  Número de Comprobante / Referencia:
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. TR-99824102-BP"
                  value={payoutReference}
                  onChange={(e) => setPayoutReference(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-900/50 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleProcessPayout}
              disabled={!payoutReference}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold uppercase tracking-wider text-xs shadow-lg cursor-pointer"
            >
              Confirmar & Registrar Desembolso
            </button>
          </div>
        </div>
      
</>; }
