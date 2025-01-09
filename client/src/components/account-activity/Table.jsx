"use client";
import { useState } from "react";
import StarIcon from "@/components/icons/StarIcon";
import CancelIcon from "@/components/icons/CancelIcon";
import ModalPopup from "@/components/ModalPopup";
import FeatureFrame from "../FeatureFrame";
import { getImage, getAudio, addFavorite, deleteRecord } from "@/api";
import { pushSuccess } from "@/components/Toast";
import { router } from "next/client";

const Table = ({ data, setLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState(data); // Manage local state for table data
  const [isLoading, setIsLoading] = useState(setLoading || false);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddFavorite = async (item) => {
    setIsLoading(true);
    const formData = new FormData();
    if (item.favorite === true) {
      formData.append("favorite", "false")
      item.favorite = false;
    } else {
      formData.append("favorite", "true")
      item.favorite = true;
    };
    try {
      const res = await addFavorite(formData, item._id);
      setTableData((prevData) =>
        prevData.map((dataItem) => (dataItem.id === item._id ? res : dataItem))
      );
      pushSuccess(item.favorite ? "Add to Favorite successfully." : "Remove from Favorite successfully.");
    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async (item) => {
    setIsLoading(true);
    try {
      await deleteRecord(item._id); // Call API to delete item
      setTableData((prevData) =>
        prevData.filter((dataItem) => dataItem.id !== item._id)
      );
      pushSuccess("History record deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUrl = async (item) => {
    if (item.type === "handwriting") {
      const imageUrl = await getImage(item.image_id[0].toString());
      item.imageUrl = imageUrl;
      setSelectedItem(item);
    } else if (item.type === "audio") {
      const audioUrl = await getAudio(item.audio_id[0].toString());
      item.audioUrl = audioUrl;
      setSelectedItem(item);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Fill the remaining rows with empty objects if there are fewer than itemsPerPage
  const filledData = [...paginatedData];
  while (filledData.length < itemsPerPage) {
    filledData.push({});
  }

  return (
    <>
      <div className="mt-6 bg-pink text-white rounded-lg shadow-md">
        <div className="grid grid-cols-5 p-4 font-bold">
          <div>Corrected Text</div>
          <div>Transcribed Text</div>
          <div>Timestamp</div>
          <div>Type</div>
          <div>Actions</div>
        </div>

        {filledData.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 p-4 border-t border-pink ${item.answer
              ? "bg-black hover:bg-orange hover:cursor-pointer hover:text-black"
              : "bg-transparent"
              }`}
            onClick={
              item.answer
                ? () => {
                  handleAddUrl(item).then(() => handleOpenModal());
                }
                : null
            }
          >
            <div>{item.answer || "\u00A0"}</div>
            <div>
              {item.transcribedText || (item.answer ? "Raw text" : "\u00A0")}
            </div>
            <div>{item.time || "\u00A0"}</div>
            <div>{item.type || "\u00A0"}</div>
            <div className="flex space-x-2">
              {item.answer && (
                <>
                  {/*<div onClick={() => handleAddFavorite(item)}>*/}
                  {/*  <StarIcon isFilled={item.favorite} className="mr-1.25" />*/}
                  {/*</div>*/}
                  {/*<div onClick={() => handleDeleteConfirm(item)}>*/}
                  {/*  <CancelIcon width={20} height={20} />*/}
                  {/*</div>*/}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1
              ? "bg-pink text-white p-3"
              : "bg-[#D9D9D9] text-black"
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <ModalPopup
        open={isModalOpen}
        handleClose={handleCloseModal}
        title={"Details"}
        onAddFavorite={() => handleAddFavorite(selectedItem)}
        onDelete={() => handleDeleteConfirm(selectedItem)}
        isFavorite={selectedItem?.favorite}
      >
        <FeatureFrame type={selectedItem?.type} props={selectedItem} />
      </ModalPopup>
    </>
  );
};

export default Table;
