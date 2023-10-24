"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface Props {
  title: string;
  text: string;
  option1: string;
  onClick: any;
}

export default function Modal({title, text, option1, onClick}: Props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-custom-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed  inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-md shadow-xl transform overflow-hidden rounded-2xl bg-default-white p-6 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-center justify-center text-primary leading-6 text-gray-900"
                  >
                   {title}
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-lg text-center justify-center rounded-lg outline-none text-gray-500">
                      {text}
                    </p>
                  </div>

                  <div className='flex items-center justify-center text-center'>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 py-2 text-lg"
                        onClick={onClick}
                      >
                        {option1}
                      </button>
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex font-base hover:font-bold outline-none border-none transition-all ml-7 justify-center rounded-lg px-4 py-2 text-lg"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
