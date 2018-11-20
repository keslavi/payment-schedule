import { CUMIPMT } from './financial';

  // eslint-disable-next-line
  Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
  {
     var n = this,
     c = isNaN(decimals) ? 2 : Math.abs(decimals),
     d = decimal_sep || '.',
     t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
     sign = (n < 0) ? '-' : '',
     // eslint-disable-next-line
     i = parseInt(n = Math.abs(n).toFixed(c)) + '',
     // eslint-disable-next-line
     j = ((j = i.length) > 3) ? j % 3 : 0;
     return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  }

  // eslint-disable-next-line
  function round(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }


  const pmt = (ir,np,pv) =>{//(rate, time, principle)
        /*
          final found good working example here:
          http://www.quepublishing.com/articles/article.aspx?p=23230

          formula:
          PMT = PV x IR / (1 â€“ (1 + IR)â€“NP)
          converted to js:
          PMT = (PV * IR) / (1 - Math.pow(1 + IR, -NP))
        */
        ir=ir/100;
         let pay = (pv * ir) / (1 - Math.pow(1 + ir, -np));
         const ret={
           id: pad(np,2),
           payment:(+(pay)).toMoney(),
           time: +np,
           rate: +ir,
           financeCharge:((pay*np) - (pv)).toMoney(),
           redeem: (pv + ((pay*np) - (pv))).toMoney(),
         }

         np=2;
         pay=(pv * ir) / (1 - Math.pow(1 + ir, -np));
         //ret.financeCharge31=((pay*np) - (pv)).toMoney();
         ret.redeem31=(pv + ((pay*np) - (pv))).toMoney();

         // np=3
         // pay=(pv * ir) / (1 - Math.pow(1 + ir, -np));
         //ret.financeCharge61=((pay*np) - (pv)).toMoney();
         ret.redeem61=(pv + ((pay*np) - (pv))).toMoney();

         // np=4
         // pay=(pv * ir) / (1 - Math.pow(1 + ir, -np));
         //ret.financeCharge91=((pay*np) - (pv)).toMoney();
         ret.redeem91=(pv + ((pay*np) - (pv))).toMoney();

         return ret;
  }

  export const getScheduleDet=(amt,time)=>{
    var m={
      principle:+(amt),
      time:+(time),
    }
    var p = +(amt);
    m.rate= p<=1975 ? +12.5 : +10;

    let r = +(m.rate);
    let t=+(time);
    let ret=pmt(r,t,p);
    return ret;
  }

  const pad=(num, size)=> {
      const s = "000000000" + num;
      return s.substr(s.length-size);
  }

  

  export const getScheduleSum=(amt,rate, range)=>{
    var m   = {amt:+(amt)}
    var p   = +(amt);
    m.rate  = +(rate);//p<=1975 ? +12.5 : +10;// p<=1975 ? '152.083 APR' : '121.667 APR';
    var r   = m.rate;
    m.range = +(range);
    m.schedules=[];

    const p12 = parseFloat(pmt(r,12,p).payment); 
    const p12Tot = p12 * 12;
    
    for (let t = 1; t <= m.range; t++) {
      let paymentDet=pmt(r,t,p);
      if (t>12) {
        paymentDet.payment = p12;
        paymentDet.payment2 = (p12Tot - p)/(t-12);
      }
      m.schedules.push(paymentDet);
    }
    return m;
  }

  //PMT(r,t1,p)
  //=((-PMT(r,t2,p)*t2)-(-PMT(r,t2,p)*12)-(-CUMIPMT(r,t2,p,13,t2,0)))/(t2-12)

  //PMT($AA88,Q$3,$A88)
  //=((-PMT($AA88,O$3,$A88)*O$3)-(-PMT($AA88,O$3,$A88)*12)-(-CUMIPMT($AA88,O$3,$A88,13,O$3,0)))/(O$3-12)