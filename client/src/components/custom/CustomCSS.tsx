export const CustomCSS = {
  cardBG: "bg-white w-[90%] md:w-full p-4 rounded-lg shadow-sm drop-shadow-sm",

  //Table
  tableCell: {
    textTransform: "uppercase",
    fontWeight: "bolder",
    letterSpacing: "2px",
    color: "white",
  },

  //Grids
  gridTwo: "grid md:grid-cols-2 gap-6 w-full",
  gridThree: "grid md:grid-cols-3 gap-6 w-full",

  // Buttons
  submitButton:
    "py-3 text-[#4B49AC] bg-[#98BDFF] font-bold text-md px-6 py-1 rounded-[4px] transition-all ease-in duration-300 uppercase outline-none hover:bg-[#7DA0FA] hover:text-white hover:ring-1 hover:ring-[#7DA0FA] tracking-[2px]",
  deleteButton:
    "py-3 text-[#f6f6f6] bg-[#db0f27] font-bold text-md px-6 py-1 rounded-[4px] transition-all ease-in duration-100 uppercase outline-none hover:bg-[#9A0B1B] hover:ring-1 hover:ring-[#db0f2790] tracking-[2px]",
  updateButton:
    "py-3 text-[#f6f6f6] bg-[#488ac7] font-bold text-md px-6 py-1 rounded-[4px] transition-all ease-in duration-100 uppercase outline-none hover:bg-[#488ac790] hover:ring-1 hover:ring-[#488ac790] tracking-[2px]",
  addButton:
    "py-2 px-3 rounded-[6px] shadow-md drop-shadow-md transition-all ease-in duration-100 bg-[#4B49AC] text-white hover:bg-[#7978E9] hover:ring-1 hover:ring-[#4B49AC] font-bold uppercase text-md outline-none tracking-[1px]",

  //Icon Buttons
  editIconButton: {
    color: "#488ac7",
    "&:hover": {
      bgcolor: "#488ac7",
      color: "white",
    },
    transition: "all ease-in-out 0.2s",
  },
  deleteIconButton: {
    color: "#db0f27",
    "&:hover": {
      bgcolor: "#db0f27",
      color: "white",
    },
    transition: "all ease-in-out 0.2s",
  },

  // Inputs
  label:
    "block text-[#98BDFF] text-sm pb-1 uppercase font-bold tracking-widest",
  input:
    "py-3 rounded-lg px-6 border w-full border-[#7978E990] placeholder:text-[#98BDFF80] focus:outline-[#98BDFF]",
  imageLabel:
    "border border-[#7978E990] px-4 block w-full text-[#98BDFF] text-center rounded-lg cursor-pointer font-bold py-11",
  displayUploadedImage:
    "block mx-auto max-h-[400px] max-w-[50%] rounded-lg mb-5",

  // Modals
  deleteModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #ff000070",
    borderRadius: "11px",
    boxShadow: 24,
    p: 4,
  },
};
