const download = (req, res) => {
  res.download('/home/debian/download.txt');
};

export default download;
