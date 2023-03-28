import TypeEffect, { TypeEffectInstance } from "../.."

export default function back(): TypeEffectInstance {
  return new TypeEffect(this.el, this.options);
}