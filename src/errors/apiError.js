const newApiError = (errorCode, errorMessage) => ({ errorCode, errorMessage });

const handleValidationError = (errors) => {
  const errorResponses = errors?.errors?.map((error) => {
    if (error?.path === 'fullName') {
      return newApiError('ERR_NEWS_AGG_INVALID_FULL_NAME', error?.msg);
    }
    if (error?.path === 'email') {
      return newApiError('ERR_NEWS_AGG_INVALID_EMAIL', error?.msg);
    }
    if (error?.path === 'password') {
      return newApiError('ERR_NEWS_AGG_INVALID_PASSWORD', error?.msg);
    }
    return newApiError('ERR_NEWS_AGG_DEFAULT', error?.msg);
  });

  const errorResponse = {
    errorCount: errorResponses.length,
    description: 'Please pass valid request',
    errors: errorResponses,
  };
  return errorResponse;
};

module.exports = { handleValidationError, newApiError };
