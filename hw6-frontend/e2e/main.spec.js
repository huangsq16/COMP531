import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findxpath} from './selenium'
import landing from './landing'

describe('Test Main Page', (done) => {

    before('should log in', (done) => {
        go().then(landing.login).then(done)
    })
    const article = `${Math.random()} post new article`
    it("Create new article and validate article appears in feed", (done) => {
	    let count
	    sleep(1000)
	    .then(findxpath("//div[@name='totalArticles']")
	       .then(r => {count = r.length}))
        .then(findId('newArticle').clear())
        .then(findId('newArticle').sendKeys(article))
        .then(findId('uploadNewArticle').click())
	    .then(sleep(1000))
	    .then(findxpath("//div[@name='totalArticles']")
            .then(r => {expect(r.length).to.equal(count+1)}))
		.then(done)    
    })

    it("Edit an article and validate the article text has updated", (done) => {
	    sleep(500)
	    .then(findId('hy23test-1').click())
        .then(findId('hy23test-1').sendKeys('test'))  
        .then(findId('hy23test-1-update').click())
        .then(sleep(1000))
        .then(findId('hy23test-1').getText()
            .then((text)=>{expect(text).to.equal(`${article}test`)}))     
        .then(done)
    })


    it("Update the headline and verify the change", (done) => {
    	let headline='new headline';
       	 sleep(500)
        .then(findId('simple-headline').sendKeys(headline))
        .then(findId('update-simple-headline').click())
        .then(sleep(1000))
        .then(findId('simple-headline').getAttribute('placeholder')
            .then(text => {expect(text).to.equal(headline)}))
        .then(done)
    })
    it("Should Remove a follower and decrease count by 1", (done) => {
            let count    
            sleep(500)
            .then(findxpath("//button[@name='rmFollower']")
                .then(r => {
                    count = r.length;
                    r[0].click()
                }))
            .then(sleep(1000))    
            .then(findxpath("//button[@name='rmFollower']")
                .then(r => {expect(r.length).to.equal(count-1)})
            )
            .then(done)       
    })

    it("Should Add a follower and increase the count by 1", (done) => {
        let count    
         sleep(500)
        .then(findId('follower').sendKeys('hy23'))
        .then(findxpath("//button[@name='rmFollower']")
            .then(r => {count = r.length}))
        .then(sleep(1000))
        .then(findId('addFollower').click())
        .then(sleep(1000))    
        .then(findxpath("//button[@name='rmFollower']")
            .then(r => {expect(r.length).to.equal(count + 1)}))
    	.then(done)      
        })

    

    it("Search for special &quot", (done) => {
	    let count   
	    sleep(500)
	    .then(findxpath("//div[@name='totalArticles']")
	       .then(r => {count = r.length}))
        .then(findId('search').sendKeys(`${article}test`))
	    .then(sleep(1000))
	    .then(findxpath("//div[@name='totalArticles']")
	       .then(r => {expect(r.length).to.equal(1)}))
		.then(done)     
    })


})