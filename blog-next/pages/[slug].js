import Link from 'next/link'

export default function Post(props) {
    return (
       <div>
            <p>{props.post.Content}</p>
            <Link href='/'>
                <a>go to homepage</a>
           </Link>
       </div>
    )
}

// tell nextjs how many pages are there
export async function getStaticPaths() {
    const response = await fetch('http://localhost:1337/posts')
    const posts = await response.json()
    const paths = posts.map(function(post) {
        return {
            params: {slug: post.Slug}
        }
    })
    
    return {
        paths,
        fallback: false
    }
}
// for each individual page, get the data for that page
export async function getStaticProps(params) {
    const slug = params.params.slug
    
    const response = await fetch(`http://localhost:1337/posts?Slug=${slug}`)
    const data = await response.json()
    const post = data[0]
    
    return {
        props: { post: post }
    }
}