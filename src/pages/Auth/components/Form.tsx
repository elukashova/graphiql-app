import styles from './Form.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
// import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type UserData = {
  email: string;
  password: string;
};

const AuthForm = (): JSX.Element => {
  const { handleSubmit, reset } = useForm<UserData>();

  const onSubmit = (userData: UserData) => {
    reset();
    console.log(userData);
  };
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isSubmitSuccessful },
  // } = useForm<FormData>({
  //   criteriaMode: 'all',
  //   mode: 'onSubmit',
  //   reValidateMode: 'onSubmit',
  // });
  // const { onArrivalChange, dateRules, avatarRules } = useValidation();
  // const ratingsDescOrder: number[] = [5, 4, 3, 2, 1];

  // const dispatch = useAppDispatch();
  // const reviews = useAppSelector((state: RootState) => state.form.reviews);

  // const onSubmit = (review: FormData) => {
  //   setTimeout(() => reset(), 1500);

  //   const newReview: Review = {
  //     ...review,
  //     image: URL.createObjectURL(review.image[0]),
  //   };

  //   setTimeout(
  //     () => dispatch(setReviewData([...reviews, { ...newReview, id: reviews.length }])),
  //     1500
  //   );
  // };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" required />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type="password" required />
        </label>
      </div>

      <div>
        <input
          className={styles.submit}
          type="submit"
          value="submit"
          data-testid="submit"
          data-cy="submit"
        />
      </div>
    </form>
  );
};

export default AuthForm;
