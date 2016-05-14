import { expect } from 'chai'
import humblebundle, { login, order, claimed } from '../lib.js'

describe('humblebundle', function() {
  it('should have the correct default interface', function() {
    expect(humblebundle).to.have.property('login')
    expect(humblebundle).to.have.property('order')
    expect(humblebundle).to.have.property('claimed')
  })

  describe('login', function() {
    it('needs environment variables set', function() {
      expect(process.env.HUMBLE_EMAIL).to.exist
      expect(process.env.HUMBLE_PASSWORD).to.exist
    })

    it('should allow login', function(){
      return login(process.env.HUMBLE_EMAIL, process.env.HUMBLE_PASSWORD)
        .then( res => res.json() )
        .then( ans => expect(ans.success).to.be.ok )
    })
  })

  describe('order', function() {
    it('should be able to list bundle IDs', function() {
      return order()
        .then(orders => {
          expect(orders).to.be.a('array')
        })
    })

    it('should be able to get a single bundle', function() {
      return order('8XpAp8Gqv2Bu')
        .then(product => {
          expect(product).to.have.property('amount_spent')
          expect(product).to.have.property('product')
          expect(product).to.have.property('subproducts')
        })
    })
  })

  describe('claimed', function(){
    it('should be able to get claimed entities', function(){
      this.timeout(60000)
      return claimed()
        .then(claims => {
          expect(claims).to.have.property('SubProducts')
        })
    })
  })
})
