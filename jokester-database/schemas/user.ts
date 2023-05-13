export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string'
    },
    {
      name: 'jokestername',
      title: 'JokesterName',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'imageUrl',
      title: 'ImageUrl',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'jokepoints',
      title: 'JokePoints',
      type: 'number',
      readonly: 'true',
      initialValue: 0
    },
    {
      name: 'jokescore',
      title: 'JokeScore',
      type: 'number',
      readonly: 'true',
      initialValue: 0
    },
    {
      name: 'settings',
      title: 'Settings',
      type: 'object',
      fields: [
        {
          name: 'darkmode',
          title: 'DarkMode',
          type: 'boolean',
          initialValue: 'true'
        },
        {
          name: 'showrealname',
          title: 'ShowRealName',
          type: 'boolean',
          initialValue: 'true'
        },
        {
          name: 'showemail',
          title: 'ShowEmail',
          type: 'boolean',
          initalValue: 'false',
        }
      ]
    }
  ]
}