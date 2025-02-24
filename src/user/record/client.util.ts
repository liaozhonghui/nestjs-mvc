export function clientVersionTransfer(clientVersion) {
  const version = clientVersion ?? '';
  return Number.parseInt(
    version
      .split('.')
      .map((part) => part.padStart(2, '0'))
      .join(''),
  );
}
