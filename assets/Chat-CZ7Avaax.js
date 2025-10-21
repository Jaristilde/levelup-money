import{c as j,y as N,r as n,j as e,C as k,z as S,T as $,e as A}from"./index-Cg4_vX4T.js";import{B as I}from"./button-WkCkdKiH.js";import{S as u}from"./sparkles-B5IUxqVy.js";import{L as D}from"./lightbulb-C2VkhLky.js";import{S as C}from"./shield-BHWTFUxA.js";import{D as B}from"./dollar-sign-C3gNYd3C.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=j("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]),E=()=>{const{t:R,language:p}=N(),[l,m]=n.useState([{role:"assistant",content:p==="en"?`Hello! I'm your AI financial assistant powered by LevelUp Money. I can help you with:

• Credit score improvement strategies
• Debt payoff planning
• Budgeting and saving tips
• Investment advice
• Financial goal setting

What would you like to know?`:`¡Hola! Soy tu asistente financiero de IA impulsado por LevelUp Money. Puedo ayudarte con:

• Estrategias para mejorar tu puntaje de crédito
• Planificación de pago de deudas
• Consejos de presupuesto y ahorro
• Asesoramiento de inversión
• Establecimiento de metas financieras

¿Qué te gustaría saber?`,timestamp:new Date}]),[a,d]=n.useState(""),[r,h]=n.useState(!1),f=n.useRef(null),c=n.useRef(null),x=[{icon:$,label:"How to improve my credit score?",query:"How can I improve my credit score?"},{icon:C,label:"Debt payoff strategies",query:"What are the best debt payoff strategies?"},{icon:B,label:"Emergency fund advice",query:"How much should I save for an emergency fund?"},{icon:A,label:"Set financial goals",query:"Help me set realistic financial goals"}],b=()=>{var t;(t=f.current)==null||t.scrollIntoView({behavior:"smooth"})};n.useEffect(()=>{b()},[l,r]);const y=t=>{const s=t.toLowerCase();return s.includes("credit score")||s.includes("improve")&&s.includes("credit")?`Great question! Here are proven strategies to improve your credit score:

✅ Pay all bills on time (35% of score)
✅ Keep credit utilization under 30% (30% of score)
✅ Don't close old credit cards
✅ Limit new credit applications
✅ Dispute any errors on your report

Based on your current score of 720, focusing on lowering your credit utilization from 25% to under 10% could increase your score by 15-25 points!

Would you like me to create a personalized credit improvement plan?`:s.includes("debt")||s.includes("payoff")||s.includes("snowball")||s.includes("avalanche")?`I can help you choose the best debt payoff strategy! Here's a quick comparison:

🔥 **Snowball Method**
• Pay smallest debts first
• Quick psychological wins
• Builds momentum
• Great for motivation

💰 **Avalanche Method**
• Pay highest interest first
• Saves the most money
• Mathematically optimal
• Best for long-term savings

Based on your $12,450 in debt with an extra $350/month payment:

• Snowball: Debt-free in 35 months
• Avalanche: Debt-free in 34 months, save $287 in interest

Would you like me to create a detailed payoff plan?`:s.includes("emergency")||s.includes("savings")||s.includes("save")?`Building an emergency fund is crucial! Here's my recommendation:

🎯 **Target Amount**: 3-6 months of expenses
📊 **Your estimated need**: $15,000 (based on average expenses)
💪 **Current progress**: You have $2,500 saved (17% of goal)

**Action Plan:**
1. Set up automatic $200/month transfer
2. Save windfalls (tax refunds, bonuses)
3. Keep in high-yield savings account
4. Don't touch except for true emergencies

At $200/month, you'll reach your goal in 5 years. Want to explore ways to increase your monthly savings?`:s.includes("budget")||s.includes("spending")||s.includes("expenses")?`Let's optimize your budget using the 50/30/20 rule:

📊 **Recommended Allocation:**
• 50% Needs (housing, food, utilities): $2,500
• 30% Wants (entertainment, dining): $1,500
• 20% Savings/Debt: $1,000

**Your Current Spending:**
• Needs: 55% ($2,750) - Slightly high
• Wants: 25% ($1,250) - Good!
• Savings: 20% ($1,000) - On track!

💡 **Quick Wins:**
• Reduce dining out by $100/month
• Negotiate lower insurance rates
• Cancel unused subscriptions

This could free up $200/month for extra debt payments or savings!`:s.includes("goal")||s.includes("plan")||s.includes("future")?`Let's set up SMART financial goals! Here's what I recommend:

🎯 **Short-term (1 year)**
• Build emergency fund to $5,000
• Pay off $3,000 in credit card debt
• Increase credit score to 750+

🎯 **Medium-term (3-5 years)**
• Save $20,000 for home down payment
• Become completely debt-free
• Max out retirement contributions

🎯 **Long-term (10+ years)**
• Own a home
• Build $500k net worth
• Retire comfortably at 65

Would you like me to break any of these down into monthly action steps?`:s.includes("invest")||s.includes("retirement")||s.includes("401k")?`Great question about investing! Here's my advice:

📈 **Priority Order:**
1. Build $1,000 emergency fund
2. Get employer 401(k) match (free money!)
3. Pay off high-interest debt (>7% APR)
4. Max out Roth IRA ($7,000/year)
5. Increase 401(k) to 15% of income
6. Taxable investment account

**Recommended Asset Allocation (Age 32):**
• 80% Stocks (aggressive growth)
• 15% Bonds (stability)
• 5% Cash (liquidity)

💰 **Compound Interest Magic:**
Investing $500/month at 8% return = $1.4M in 40 years!

Would you like a personalized investment strategy?`:`I understand you're asking about ${t}. Let me help you with that!

To give you the most accurate advice, could you provide more details? For example:

• What's your current financial situation?
• What's your specific goal or concern?
• What have you tried so far?

In the meantime, here are some resources:
• Check your Credit Report page for score insights
• Visit the Debt page for payoff calculators
• Review your Budget for spending analysis
• Set Goals to track your progress

What would you like to explore first?`},g=async()=>{var i;if(!a.trim()||r)return;const t={role:"user",content:a,timestamp:new Date};m(o=>[...o,t]),d(""),h(!0),await new Promise(o=>setTimeout(o,1e3+Math.random()*1e3));const s={role:"assistant",content:y(a),timestamp:new Date};m(o=>[...o,s]),h(!1),(i=c.current)==null||i.focus()},v=t=>{var s;d(t),(s=c.current)==null||s.focus()},w=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),g())};return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 lg:pb-8",children:e.jsxs("div",{className:"max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]",children:[e.jsx("header",{className:"mb-6",children:e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-br from-brand-green to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg",children:e.jsx(u,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-slate-900 font-poppins flex items-center gap-2",children:"AI Financial Assistant"}),e.jsxs("p",{className:"text-slate-600 font-inter flex items-center gap-2",children:[e.jsx("span",{className:"w-2 h-2 bg-emerald-500 rounded-full animate-pulse"}),"Powered by advanced AI • Available 24/7"]})]})]})}),l.length===1&&e.jsxs("div",{className:"mb-4",children:[e.jsx("p",{className:"text-sm font-semibold text-slate-700 mb-3 font-inter",children:"Quick Actions:"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:x.map((t,s)=>{const i=t.icon;return e.jsx("button",{onClick:()=>v(t.query),className:"p-3 bg-white border-2 border-slate-200 rounded-xl hover:border-brand-green hover:bg-brand-green/5 transition-all text-left group",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center group-hover:bg-brand-green/20 transition-colors",children:e.jsx(i,{className:"w-5 h-5 text-brand-green"})}),e.jsx("span",{className:"text-sm font-semibold text-slate-900 font-inter",children:t.label})]})},s)})})]}),e.jsxs(k,{className:"flex-1 flex flex-col rounded-3xl shadow-xl overflow-hidden border-2 border-slate-200",children:[e.jsxs(S,{className:"flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white",children:[l.map((t,s)=>e.jsx("div",{className:`flex ${t.role==="user"?"justify-end":"justify-start"} animate-fade-in`,children:e.jsxs("div",{className:"flex items-start gap-3 max-w-[85%]",children:[t.role==="assistant"&&e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-brand-green to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md",children:e.jsx(u,{className:"w-4 h-4 text-white"})}),e.jsxs("div",{className:`rounded-2xl px-4 py-3 shadow-sm ${t.role==="user"?"bg-gradient-to-r from-brand-blue to-brand-blue-light text-white":"bg-slate-50 text-slate-900 border-2 border-slate-200"}`,children:[e.jsx("p",{className:"text-sm leading-relaxed whitespace-pre-wrap font-inter",children:t.content}),t.timestamp&&e.jsx("p",{className:`text-xs mt-2 ${t.role==="user"?"text-white/70":"text-slate-500"} font-inter`,children:t.timestamp.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]}),t.role==="user"&&e.jsx("div",{className:"w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0 shadow-md",children:e.jsx("span",{className:"text-white font-bold text-sm",children:"You"})})]})},s)),r&&e.jsx("div",{className:"flex justify-start animate-fade-in",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-brand-green to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md",children:e.jsx(u,{className:"w-4 h-4 text-white"})}),e.jsx("div",{className:"bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 shadow-sm",children:e.jsxs("div",{className:"flex gap-1",children:[e.jsx("div",{className:"w-2 h-2 bg-brand-green rounded-full animate-bounce",style:{animationDelay:"0ms"}}),e.jsx("div",{className:"w-2 h-2 bg-brand-green rounded-full animate-bounce",style:{animationDelay:"150ms"}}),e.jsx("div",{className:"w-2 h-2 bg-brand-green rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})})]})}),e.jsx("div",{ref:f})]}),e.jsxs("div",{className:"border-t-2 border-slate-200 p-4 md:p-6 bg-slate-50",children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx("input",{ref:c,type:"text",value:a,onChange:t=>d(t.target.value),onKeyDown:w,placeholder:"Ask me anything about your finances...",disabled:r,className:"flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all font-inter text-slate-900 placeholder-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed"}),e.jsx(I,{onClick:g,disabled:!a.trim()||r,className:"bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold",children:e.jsx(M,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"mt-3 flex items-center gap-2 text-xs text-slate-500 font-inter",children:[e.jsx(D,{className:"w-4 h-4 text-brand-yellow"}),e.jsx("span",{children:"Tip: Be specific about your financial questions for better answers"})]})]})]})]})})};export{E as default};
