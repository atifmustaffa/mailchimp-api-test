const mailchimp = require('./mailchimp-script')

/**
 * This is reset function to remove any list and campaigns to avoid duplicate value
 * Also because of limitation of free account; Limited to 1 list. This may cause error of resource not available
 */
module.exports = async function () {
  // List
  let { lists } = await mailchimp.getLists()
  lists.map(async (ls) => {
    // Remove each of list
    await mailchimp.deleteList(ls.id)
    console.info('Reset:', 'Delete list', ls.name, ls.id)
  })

  // Campaign
  let { campaigns } = await mailchimp.getCampaigns()
  campaigns.map(async (cp) => {
    // Remove each of campaign
    await mailchimp.deleteCampaign(cp.id)
    console.info('Reset:', 'Delete campaign', cp.id)
  })
  console.info('Reset finished')
}
