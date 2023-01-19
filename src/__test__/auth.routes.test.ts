import app from '../server'
import supertest from 'supertest'
import request from 'supertest'
import prisma from '../db'

describe('GET /', () => {
    it('it should send back some data', async () => {
        const res = await supertest(app)
            .get('/')

        expect(200)
        expect(res.body.message).toBe('Hello')
    })
})

describe('POST /user', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .post('/user')
            .send({ username: 'sinupUser', password: 'signupUserPass' })
            .set('Accept', 'application/json')

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })

})

describe('POST /signin', () => {
    it('responds with json', async () => {
        const res = await request(app)
            .post("/signin")
            .send({ username: 'sinupUser', password: 'signupUserPass' })
            .set("Accept", "application/json")

        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})

afterAll(async () => {
    await prisma.user.delete({
        where: {
            username: 'sinupUser'
        }
    })
})
