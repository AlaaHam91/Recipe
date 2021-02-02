export default {
  index() {
    return [
      {
        id: 1,
        name: "Recipe 1",
        description: "This is the description of recipe 1",
        image: "https://picsum.photos/200/300"
      },
      {
        id: 2,
        name: "Recipe 2",
        description: "This is the description of recipe 2",
        image: "https://picsum.photos/200/300?random=1"
      },
      {
        id: 3,
        name: "Recipe 3",
        description: "This is the description of recipe 3",
        image: "https://picsum.photos/200/300?random=2"
      },
      {
        id: 4,
        name: "Recipe 4",
        description: "This is the description of recipe 3",
        image: "https://picsum.photos/200/300?random=3"
      },
      {
        id: 5,
        name: "Recipe 5",
        description: "This is the description of recipe 3",
        image: "https://picsum.photos/200/300?random=4"
      }
    ];
  },

  show(id) {
    id;
    return {
      id: 2,
      name: "Recipe 2",
      description: "This is the description of recipe 2",
      image: "https://picsum.photos/200/300?random=1"
    };
  },

  create() {
    return {
      id: 1,
      name: null,
      description: null,
      image: null
    };
  },

  update(id) {
    id;
    return {
      id: 1,
      name: null,
      description: null,
      image: null
    };
  },

  delete(id) {
    id;
    return true;
  }
};
