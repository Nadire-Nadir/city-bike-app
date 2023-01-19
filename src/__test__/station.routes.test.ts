import app from '../server'
import supertest from 'supertest'
import request from 'supertest'
import prisma from '../db'

let jwt: string
beforeAll(async () => {  
    await prisma.station.deleteMany({})

    jwt = await (
        await request(app)
            .post('/user')
            .send({ username: 'stationTestUser', password: 'stationTestUser' })
    )
        .body.token
    
    await (
        await request(app).post('/api/station').send({
        stationId: '1',
        stationNameFi: 'stationNameFi',
        stationNameSe: 'stationNameSe',
        stationNameEn: 'stationNameEn',
        addressFi: 'addressFi',
        addressEn: 'addressEn',
        cityFi: 'cityFi',
        citySe: 'citySe',
        operator: 'operator',
        capacities: 1,
        xCoordinate: 1,
        yCoordinate: 1
    })
        .set({ authorization: `Bearer ${jwt}` })
    )
})


describe('GET /api/station', () => {

    it('responds with json', async () => {
        const res = await supertest(app)
            .get('/api/station')

            .set({ authorization: `Bearer ${jwt}` })
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})

describe('GET /api/station/:id', () => {

    it('responds with json', async () => {
        const res = await supertest(app)
            .get('/api/station/1')

            .set({ authorization: `Bearer ${jwt}` })
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})

describe('PUT /api/station/:id', () => {

    it('responds with json', async () => {
        const res = await supertest(app)
            .put('/api/station/1')
            .send({ operator: "newOperator", capacities: 44 })
            .set({ authorization: `Bearer ${jwt}` })

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})

describe('DELETE /api/station/:id', () => {

    it('responds with json', async () => {
        const res = await supertest(app)
            .delete('/api/station/1')
            .set({ authorization: `Bearer ${jwt}` })

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})

afterAll(async () => {
    await prisma.user.delete({
        where: {
            username: 'stationTestUser'
        }
    })
})
