import { sendGet } from 'services/BackendFactory';

export function fetchQuizzes (opts) {
  return sendGet({
    resource: `api.php?amount=10&category=21&difficulty=medium&type=multiple`,
    ...opts
  })
}
