describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Matti Luukkainen',
      username: 'root',
      password: 'root'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'John Luukkainen',
      username: 'admin',
      password: 'admin'
    })

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#button-login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#button-login').click()
      cy.get('#blogs').should('contain', 'blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#button-login').click()
      cy.get('.message')
        .contains('invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    const blog = {
      title: 'second liked',
      author: 'This is an author',
      url: 'This is a url'
    }

    const blog1 = {
      title: 'most liked',
      author: 'This is an author',
      url: 'This is a url'
    }

    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
    })

    it('a blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()

      cy.contains(blog.title)
    })

    it('a user can like a blog', function() {
      cy.createBlog(blog)
      cy.contains(blog.title)

      cy.get('.toggleButton').click()
      cy.get('.likeButton').click()
      cy.contains('likes 1')
    })

    it('a user can delete their blogs', function() {
      cy.createBlog(blog)
      cy.contains(blog.title)
      cy.get('.toggleButton').click()
      cy.get('#remove-button').click()
      cy.wait(2000)
      cy.get('#bloglist').should('not.contain', blog.title)
    })

    it('only user can see the remove button', function() {
      cy.createBlog(blog)
      cy.contains(blog.title)
      cy.get('.toggleButton').click()
      cy.contains('remove').should('exist')
      cy.get('#logout').click()

      cy.login({ username: 'admin', password: 'admin' })
      cy.get('.toggleButton').click()
      
      cy.contains('remove').should('not.exist')
    })

    it('most liked blog will be the top', function() {
      cy.createBlog(blog)
      cy.createBlog(blog1)

      cy.get('.blog').eq(0).should('contain', blog.title)
      cy.get('.blog').eq(1).should('contain', blog1.title)

      cy.get('.toggleButton').eq(1).click()

      cy.get('.likeButton').click()
      cy.wait(1000)

      cy.get('.likeButton').click()
      cy.wait(1000)

      cy.get('.blog').eq(0).should('contain', blog1.title)
    })
  })
})