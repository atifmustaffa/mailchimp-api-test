const mailchimp = require('@mailchimp/mailchimp_marketing')
require('dotenv').config()

mailchimp.setConfig({
  apiKey: process.env.APIKEY,
  server: 'us14',
})
;(async () => {
  const allList = await mailchimp.lists.getAllLists()
  const firstList = allList.lists[0]

  if (firstList) {
    await mailchimp.lists.deleteList(firstList.id)
  }

  // Create list
  const newList = {
    name: 'Atif from api',
    permission_reminder: 'permission_reminder',
    email_type_option: true,
    contact: {
      company: 'Fita Sdn Bhd',
      address1: 'No 123, Jalan Developer',
      city: 'Ampang',
      country: 'MY',
      state: 'Selangor',
      zip: '68000',
    },
    campaign_defaults: {
      from_name: 'Fita',
      from_email: 'fita@hotmail.com',
      subject: 'Enjoying fita news',
      language: 'english',
    },
  }

  const createdList = await mailchimp.lists.createList(newList)

  const newMember = {
    email_address: 'noob@email.com',
    status: 'subscribed',
  }
  const addMemberToList = await mailchimp.lists.addListMember(
    createdList.id,
    newMember
  )

  const newBatchMembers = [
    {
      email_address: 'noob1@email.com',
      status: 'subscribed',
    },
    {
      email_address: 'noob2@email.com',
      status: 'subscribed',
    },
    {
      email_address: 'noob3@email.com',
      status: 'subscribed',
    },
  ]

  const addedBatchMember = await mailchimp.lists.batchListMembers(
    createdList.id,
    newBatchMembers
  )

  const newCampaign = {
    type: 'plaintext',
    recipients: {
      list_id: createdList.id,
    },
  }

  const createdCampaign = await mailchimp.campaigns.create(newCampaign)

  await mailchimp.campaigns.send(createdCampaign.id)

  const info = await mailchimp.campaigns.get(createdCampaign.id)

  console.log(info)
})()

// Object(
//   [name] => Deepak
//   [age] => 21
//   [marks] => 75
// )

// $obj->name

// {
//   name: 'Deepak'
//   age: 21
//   marks: 75
// }

// obj.name
