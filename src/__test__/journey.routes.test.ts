import app from '../server'
import supertest from 'supertest'
import request from 'supertest'
import prisma from '../db'

let jwt: string
beforeAll(async () => {
    jwt = await (
        await request(app)
            .post("/user")
            .send({ username: 'journeyTestUser', password: 'journeyTestUser' })
    )
        .body.token
})

describe('GET /api/journey', () => {

    it('responds with json', async () => {
        const res = await supertest(app)
            .get('/api/journey')

            .set({ authorization: `Bearer ${jwt}` })
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.status).toEqual(200)
    })
})

afterAll(async () => {
    await prisma.user.delete({
        where: {
            username: 'journeyTestUser'
        }
    })
})
