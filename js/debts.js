export function projectDebts(debts,extraMonthly,strategy="avalanche"){
 const ds=debts.filter(d=>Number(d.balance)>0).map(d=>({...d,balance:Number(d.balance)||0,rate:Math.max(0,Number(d.rate)||0),minimum:Math.max(0,Number(d.minimum)||0)}));
 if(!ds.length)return {months:0,interest:0,totalPaid:0,order:[],impossible:false};
 const minimums=ds.reduce((s,d)=>s+d.minimum,0),budget=minimums+Math.max(0,Number(extraMonthly)||0);
 if(budget<=0)return {months:null,interest:0,totalPaid:0,order:[],impossible:true};
 let interestTotal=0,totalPaid=0,month=0;const payoff=[];
 while(ds.some(d=>d.balance>.005)&&month<1200){month++;for(const d of ds){if(d.balance<=.005)continue;const interest=d.balance*d.rate/1200;d.balance+=interest;d._interest=(d._interest||0)+interest;interestTotal+=interest}
  let paidThisMonth=0;
  // Minimums first, only for debts still outstanding.
  for(const d of ds){if(d.balance<=.005)continue;const pay=Math.min(d.balance,d.minimum);d.balance-=pay;paidThisMonth+=pay;totalPaid+=pay}
  let extra=Math.max(0,budget-paidThisMonth);
  const ordered=[...ds].sort((a,b)=>strategy==="snowball"?(a.balance-b.balance):(b.rate-a.rate));
  for(const d of ordered){if(extra<=.005)break;if(d.balance<=.005)continue;const pay=Math.min(d.balance,extra);d.balance-=pay;extra-=pay;paidThisMonth+=pay;totalPaid+=pay}
  for(const d of ds){if(d.balance<=.005&&!d._paidOff){d.balance=0;d._paidOff=true;payoff.push({name:d.name,month})}}
 }
 return month>=1200?{months:null,interest:interestTotal,totalPaid,order:payoff,impossible:true}:{months:month,interest:interestTotal,totalPaid,order:payoff,impossible:false};
}
