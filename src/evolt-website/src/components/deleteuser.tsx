import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";

export default function DeleteUserModal({ idUser, onDeleteSuccess }: any) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteUser = async () => {
    //sending
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/users/${idUser}`
    );

    //refresh data
    onDeleteSuccess();
    closeModal();
  };

  return (
    <>
      <button
        // style={{
        //   display: "flex",
        //   gap: 4,
        //   alignItems: "center",
        //   justifyContent: "space-between",
        // }}
        type="button"
        onClick={openModal}
        className="flex items-center justify-center text-xs bg-pallete-4 rounded px-3 py-1 my-1.5 text-palette-3"
      >
        {/* <img className="h w-auto m-1" src="/assets/img/deleteButton.svg" /> */}
        <span className="sr-only"></span>Delete
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 bg-black/30 " aria-hidden="true">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md p-8 align-middle shadow-xl transition-all bg-palette-3">
                  <Dialog.Title className="text-lg font-medium leading-6 text-black w-full text-center">
                    Apakah kamu yakin <br /> DELETE data ini ?
                  </Dialog.Title>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="inline-flex m-3 justify-center rounded-md bg-palette-2 px-8 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={deleteUser}
                      style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex m-3 justify-center rounded-md bg-pallete-4 px-8 py-2 text-sm font-medium text-palette-3 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                      style={{ boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.6)" }}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
