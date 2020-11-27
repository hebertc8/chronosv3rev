const expressJwt = require('express-jwt');
const config = require('../properties/properties').chronos.valor;

exports.jwt = () => {
    const { secret } = config;
    return expressJwt({ secret })
    .unless({
        path: [
            
            '/api/login',
            '/api/test',
            '/login',
            '/pages/ScheduleManagement/Schedule',
            '/pages/ScheduleManagement/Swap',
            '/pages/Dashboard',
            '/pages/RequestViewer',
            '/jobOfferApplicants',
            '/api/jobOfferApplicants'
        ]
    }); 
}

