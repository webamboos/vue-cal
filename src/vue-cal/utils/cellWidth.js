export default {
  data: {
    headingsWidth: [],
  },
  setHeadingsWidth(value) {
    this.headingsWidth = {
      ...this.headingsWidth,
      [value.date]: value.width,
    };
    return this.headingsWidth
  }, 
};


