'use clinet'
import {
  createFAQ,
  editFAQ,
  TModelFAQ,
} from '@/features/admin-panel/action/FAQAction'
import Button from '@/shared/components/button'
import Input from '@/shared/components/input'
import {
  TFakeEvent,
  TFakeEventFile,
  TFormInputState,
  TModeForm,
} from '@/shared/types/types'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'

type TFAQFormProps = TModelFAQ & { mode: TModeForm; onCancel: () => void }

export type TFAQFormKeys = 'questions' | 'answer'
export type TFAQFormValues = Record<TFAQFormKeys, TFormInputState>

const FAQForm = ({ mode, id, answer, questions, onCancel }: TFAQFormProps) => {
  const initial = {
    questions: { value: questions ?? null },
    answer: { value: answer ?? null },
  }
  const [formValue, setFormValue] = useState(initial)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent | TFakeEventFile
  ) => {
    const { name, value } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: { value, error: null },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (mode === 'view') return
    setLoading(true)
    const payload = {
      answer: formValue.answer.value,
      questions: formValue.questions.value,
    }

    try {
      let res
      if (mode === 'create') {
        res = await createFAQ(payload)
      } else if (mode === 'edit') {
        res = await editFAQ({ ...payload, id: id })
      }
    } catch (error) {
    } finally {
      router.refresh()

      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="questions"
        type="text"
        disabled={loading}
        label="سوال"
        value={formValue.questions.value}
        required
        readOnly={mode === 'view'}
        onChange={(e) => handleChange(e)}
      />
      <Input
        name="answer"
        type="textarea"
        disabled={loading}
        label="جواب"
        value={formValue.answer.value}
        required
        readOnly={mode === 'view'}
        onChange={(e) => handleChange(e)}
        multiline
      />
      <div
        className={twMerge(
          'items-center justify-end gap-2',
          mode === 'view' ? 'hidden' : 'flex'
        )}
      >
        <Button
          type="button"
          size="fit"
          rounded="small"
          loading={loading}
          onClick={onCancel}
          label="انصراف"
          color="secandery"
          className="px-4 py-2"
        />
        <Button
          type="submit"
          size="fit"
          rounded="small"
          loading={loading}
          label={mode === 'create' ? 'ایجاد' : 'ویرایش'}
          className="px-4 py-2"
        />
      </div>
    </form>
  )
}

export default FAQForm
