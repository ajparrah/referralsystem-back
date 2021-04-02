const shareableLinkSerializer = (sharableLink, name, userId) => {
  const sharableLinkToAdd = {
    name,
    url: sharableLink,
    createdBy: userId,
  };
  return sharableLinkToAdd;
}

module.exports = {
  shareableLinkSerializer
};
