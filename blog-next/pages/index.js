import Link from 'next/link'

export default function Home(props) {
  console.log(props)
  return (
    // loop over the posts from getStaticProps function
    <div>
      { props.posts && props.posts.map( function(post){
        return (
          <Link href={`/${post.Slug}`} key={post.id}>
            <a>
              <h2>{post.Title}</h2>
              <p>{post.user.username}</p>
            </a>
          </Link>
        )
      } ) }
    </div>
  )
}


// Home
export async function getStaticProps() {
  // get posts from our strapi backend
  const response = await fetch("http://localhost:1337/posts")
  const data = await response.json()
  return {
    props: { posts: data}
  }
}