const {query, procedure} = require("./sql.controller")

let centrales = ['Copa', 'BBVA', '']

let tables = [
    [{nombre:"vwAgentStates"}, {valor: {}}],
    [{nombre:"vwIndicadores"}, {valor: {}}],
    [{nombre:"vwCentralesUsuario"}, {valor: {}}],
    [{nombre:"vwDashboards"}, {valor: {}}],
    [{nombre:"vwEstaciones"}, {valor: {}}],
    [{nombre:"vwSkills"}, {valor: {}}],
    [{nombre:"vwCantidadAgentes"}, {valor: {}}],
    [{nombre:"vwConsolidadoIndicadores"}, {valor: {}}],
    [{nombre:"vwVtoOverTime"}, {valor: {}}],
    [{nombre:"vwSaturnoChronos"}, {valor: {}}],
    [{nombre:"vwFollowAgents"}, {valor: {}}],
    [{nombre:"vwLaborEvent"}, {valor: {}}],
    [{nombre:"vwZonas"}, {valor: {}}],
    [{nombre:"vwConvenciones"}, {valor: {}}],
]

tables.forEach(dato => {
    console.log(dato)
})

module.exports = tables

const descargas = async(cbdescarga)=>{
    let inicio = new Date()
    let resumen = []
    
    console.log(inicio)
    
    let k1 = query('vwAgentStates', cb=>{ if (cb.length != 0) {agentes = cb}; tiempo(1,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k2 = query('vwIndicadores', cb=>{if (cb.length != 0) {kpis = cb} tiempo(2,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k3 = query('vwCentralesUsuario', cb=>{if (cb.length != 0) {centralesusuario = cb} tiempo(3,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k4 = query('vwDashboards', cb=>{if (cb.length != 0) {dashboards = cb}  tiempo(4,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k5 = query('vwEstaciones', cb=>{if (cb.length != 0) {estaciones = cb} tiempo(5,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k6 = query('vwSkills', cb=>{if (cb.length != 0) {skills = cb} tiempo(6,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k7 = query('vwCantidadAgentes', cb=>{if (cb.length != 0) {agentesConsolidado = cb} tiempo(7,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k8 = query('vwConsolidadoIndicadores', cb=>{if (cb.length != 0) {indicadoresConsolidado = cb} tiempo(8,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k9 = query('vwVtoOverTime', cb=>{if (cb.length != 0) {vtoot = cb} tiempo(9,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k10 = query('vwSaturnoChronos', cb=>{if (cb.length != 0) {vtootrequested = cb} tiempo(10,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k11 = query('vwFollowAgents', cb=>{if (cb.length != 0) {followagents = cb} tiempo(11,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k12 = query('vwLaborEvent', cb=>{if (cb.length != 0) {timeclockData = cb} tiempo(12,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k13 = query('vwZonas', cb=>{ if (cb.length != 0) {zonas = cb}; tiempo(1,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})
    let k14 = query('vwConvenciones', cb=>{ if (cb.length != 0) {convenciones = cb}; tiempo(1,inicio, cb.length, cbdes=> {resumen.push(cbdes)})})

//    let k1 = query('vwEstadoAgentes').then(r => { if(r.length != 0) {v.vwEstadoAgentes = r} }).catch(err => { console.log(err) })
    let d = v[1]

    Promise.all([k1,k2,k3,k4,k5,k6,k7,k8,k9,k10,k11,k12,k13,k14])
    .then(values =>{
        cbdescarga(resumen)
    })    
    .catch(values => {
        //console.log(values)
        cbdescarga(resumen)
    })
    
}
