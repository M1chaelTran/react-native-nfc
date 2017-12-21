package com.novadart.reactnativenfc.utils;

import android.content.Context;
import android.nfc.NfcAdapter;

public final class NFCUtils {
    /**
     * Check if NFC is available on the device
     *
     * @return true if the device has NFC available
     */
    public static boolean isNfcAvailable(final Context pContext) {
        boolean nfcAvailable = true;
        try {
            NfcAdapter adapter = NfcAdapter.getDefaultAdapter(pContext);
            if (adapter == null) {
                nfcAvailable = false;
            }
        } catch (UnsupportedOperationException e) {
            nfcAvailable = false;
        }
        return nfcAvailable;
    }

    /**
     * Check if NFC is enabled on the device
     *
     * @return true if the device has NFC enabled
     */
    public static boolean isNfcEnabled(final Context pContext) {
        boolean nfcEnabled = true;
        try {
            NfcAdapter adapter = NfcAdapter.getDefaultAdapter(pContext);
            nfcEnabled = adapter.isEnabled();
        } catch (UnsupportedOperationException e) {
            nfcEnabled = false;
        }
        return nfcEnabled;
    }

    /**
     * Private constructor
     */
    private NFCUtils() {
    }
}
