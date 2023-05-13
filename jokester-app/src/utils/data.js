export const categories = [
  {
    name: 'Funny',
  },
  {
    name: 'Memes',
  },
  {
    name: 'Anime & Manga',
  },
  {
    name: 'Animals',
  },
  {
    name: 'Lifestyle',
  },
  {
    name: 'Gaming',
  },
  {
    name: 'Comic',
  },
  {
    name: 'History',
  },
  {
    name: 'Sports',
  },
  {
    name: 'Tech',
  },
  {
    name: 'Crypto',
  },
  {
    name: 'Savage',
  },
  {
    name: 'Wholesome',
  },
  {
    name: 'Politics',
  },
]

export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']{
    userName,
    image{
      asset->{
        url
      }
    },
    credentialType
  }`
  return query
}