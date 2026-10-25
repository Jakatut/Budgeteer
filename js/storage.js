const STORAGE_KEY = "grounded-budget-v1";
export function defaultState(){return {settings:{anchorDate:"2026-10-21",leftoverPercent:50,debtStrategy:"avalanche"},items:[],transactions:[],debts:[],snapshots:[],actuals:{}}}
export function loadState(){try{const p=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");if(!p)return defaultState();return {...defaultState(),...p,settings:{...defaultState().settings,...(p.settings||{})},items:Array.isArray(p.items)?p.items:[],transactions:Array.isArray(p.transactions)?p.transactions:[],debts:Array.isArray(p.debts)?p.debts:[],snapshots:Array.isArray(p.snapshots)?p.snapshots:[],actuals:p.actuals||{}}}catch{return defaultState()}}
export function saveState(s){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));return true}catch(e){console.error(e);return false}}
export function uid(prefix="id"){return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}
