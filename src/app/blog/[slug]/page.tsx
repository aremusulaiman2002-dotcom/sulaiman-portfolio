async function getPost(slug: string): Promise<any> {
  // Fetch ALL fields without specifying them
  const query = `*[_type == "post" && slug.current == $slug][0]`
  
  console.log('🔍 Fetching post with slug:', slug)
  const post = await client.fetch(query, { slug })
  console.log('📄 ALL Post data:', JSON.stringify(post, null, 2))
  
  return post
}