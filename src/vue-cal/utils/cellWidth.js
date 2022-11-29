export const MinCellWidth = {
  data: {
    headingsWidth: [],
  },
  methods: {
    setHeadingsWidth(value) {
      this.headingsWidth = {
        ...this.headingsWidth,
        [value.date]: value.width,
      };
      return this.headingsWidth
    },
  }
};


