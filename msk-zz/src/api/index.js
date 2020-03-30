import http from "utils/http";

export const vr = (params) =>
    http.post('/calculate/formulavr', params).then(({ result }) => result);

export const ticl = (params) =>
    http.post('/calculate/zzticl', params).then(({ result }) => result);

export const lsa = (params) =>
    http.post('/calculate/zzlsa', params).then(({ result }) => result);

export const iol = (params) =>
    http.post('/calculate/zziol', params).then(({ result }) => result);

export const tiol = (params) =>
    http.post('/calculate/zztoriciol', params).then(({ result }) => result);

export const vsas = (params) =>
    http.post('/calculate/zzastigmatism', params).then(({ result }) => result);

export const ok = (params) =>
    http.post('/calculate/zzok', params).then(({ result }) => result);

export const exop = (params) =>
    http.post('/calculate/zzexopmi', params).then(({ result }) => result);

export const vrpro = (params) =>
    http.post('/calculate/formulavrpro', params).then(({ result }) => result);

export const icl = params =>
    http.post('/calculate/zzicl', params).then(({ result }) => result);

export const iclv = params =>
    http.post('/calculate/zziclvault', params).then(({ result }) => result);

export const sia = params =>
    http.post('/calculate/zzsia', params).then(({ result }) => result);