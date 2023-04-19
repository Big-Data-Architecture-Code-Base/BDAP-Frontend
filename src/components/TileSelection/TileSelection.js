import { defineComponent, ref, computed  } from "vue";

export default defineComponent({
  name: "TileSelection",
  components: {},
  props: ["attraction_types"],
  setup(props) {

    const priceModel = ref([
      1,
      1,
      1,
      1,
      1,
    ]);

    const chosenArray = ref([]);
    const category = ref([]);
    // eslint-disable-next-line vue/no-setup-props-destructure
    category.value = props.attraction_types;


    const AddList = (id, index1) => {
      const index = category.value.findIndex(item => item.id === id);
      //  disable add button

      category.value[index].disabled = true;

      //to add different rating
      category.value[index].rating = 0;
      // push the element
      chosenArray.value.push(category.value[index]);
      // chosenArray.value.push(addedItem);

      // add the class
      const clickedDiv = document.querySelector(`.card-${index1}`);
      clickedDiv.classList.add('clicked');

    };

    const removeChosen = (name, index) => {
      chosenArray.value.splice(index, 1);
    //   change the original array as well
      const index1 = category.value.findIndex(item => item.display_name === name);
      category.value[index1].disabled = false;
    //   remove the clicked class
      const clickedDiv = document.querySelector(`.card-${index1}`);
      clickedDiv.classList.remove('clicked');
    //   reset the rating for that slot
      priceModel.value[index] = 1;
    };

    const removeList = (id, index2) => {
      const index = chosenArray.value.findIndex(item => item.id === id);
      chosenArray.value.splice(index, 1);
      //   reset the rating for that slot
      priceModel.value[index] = 1;
      // toggle button
      const index1 = category.value.findIndex(item => item.id === id);
      category.value[index1].disabled = false;

      // adding the clicked class
      const clickedDiv = document.querySelector(`.card-${index2}`);
      clickedDiv.classList.remove('clicked');

    };
    const updateRating = (id, rating) => {
      const index = chosenArray.value.findIndex((item) => item.id === id);
      chosenArray.value[index].rating = rating;
      console.log(chosenArray.value)
    };

    return {
      AddList,
      chosenArray,
      removeList,
      removeChosen,
      category,
      thirdModel: ref(0),
      updateRating,
      priceModel,
      arrayMarkerLabel: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' }
      ]
    };
  }
});
