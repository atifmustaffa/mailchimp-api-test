const mailchimp = require('./mailchimp-script')

;(async () => {
  // Reset functions
  // Uncomment or comment below line to enable or disable reset function call respectively
  // await require('./reset')()

  /* Start of required operations */

  // New list details
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

  // Add new list
  let addedList = await mailchimp.addList(newList)
  console.log('List added', addedList.id, addedList.name)

  // Store the list id for next usage
  // In this example use the last list
  let listId = addedList.id

  // Get list
  let { lists } = await mailchimp.getLists()
  console.log('List:', lists.length)

  // Get subscriber/member in the list
  let { members } = await mailchimp.getMembers(listId)
  console.log('Members:', members.length)

  /**
   * Available status: subscribed, unsubscribed, cleaned, pending, transactional
   */

  // New member value
  const newMember = {
    email_address: 'noob@mail.com',
    status: 'subscribed',
  }

  // Add a single member to the member list
  let addedMember = await mailchimp.addMember(listId, newMember)
  console.log('Member added', addedMember.id)

  // Check current members list count
  ;({ members: members } = await mailchimp.getMembers(listId))
  console.log('Members:', members.length)

  // New members for batch subscription
  const newOrgMembers = {
    members: [
      {
        email_address: 'ryan.ramadhan@mail.com',
        status: 'subscribed',
      },
      {
        email_address: 'edwin.melendez@mail.com',
        status: 'subscribed',
      },
      {
        email_address: 'christianto@mail.com',
        status: 'subscribed',
      },
    ],
  }

  // Add a batch of members to the member list
  let addedBatchMember = await mailchimp.batchSubscribeList(
    listId,
    newOrgMembers
  )
  console.log('Batch member added', addedBatchMember.new_members.length)

  // Check current members list count
  ;({ members: members } = await mailchimp.getMembers(listId))
  console.log('Members:', members.length)

  /**
   * Available type: regular, plaintext, absplit, rss, variate
   */

  // New campaign details
  const newCampaign = {
    type: 'regular',
    recipients: {
      list_id: listId,
    },
  }

  // Add campaign
  let addedCampaign = await mailchimp.addCampaign(newCampaign)
  console.log('Added campaign:', addedCampaign.id)

  // Store campaign id
  // This example use the last campaign
  let campaignId = addedCampaign.id

  // Get campaign list
  let { campaigns } = await mailchimp.getCampaigns()
  console.log('Campaigns:', campaigns.length)

  // Send the campaign
  //   await mailchimp.sendCampaign(campaignId)
  //   console.log('Campaign', campaignId, 'sent')

  // Get campaign info of id
  let campaignInfo = await mailchimp.getCampaignInfo(campaignId)
  console.log('Campaign Info:', campaignInfo.id)
})()
