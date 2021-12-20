import React, { useState, useEffect, useRef } from "react";
import { Dialog, Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      borderRadius: "0.5rem",
      height: "38.5rem",
      position: "relative",
    },
    root: {
      fontFamily: "Gilroy, sans-serif",
      padding: "3rem",
      overflowY: "scroll",
      maxHeight: "50rem",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    absoluteContainer: {
      position: "sticky",
      width: "100%",
      background: "#F3F3F3",
      padding: "1.25rem",
      bottom: 0,
      display: "flex",
      justifyContent: "flex-end",
    },
    acceptButton: {
      fontFamily: "Gilroy, sans-serif",
      textTransform: "none",
      color: "#249FFB",
      border: "0.125rem solid #249FFB",
    },
  })
);

export default function TOS({ open, setOpen, callback }) {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(true);

  const [referenceNode, setReferenceNode] = useState();

  useEffect(() => {
    if (referenceNode) {
      return () => referenceNode.removeEventListener("scroll", handleScroll);
    }
  }, [referenceNode]);

  function handleScroll(event) {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom) {
      setDisabled(false);
    }
  }

  const paneDidMount = (node) => {
    if (node) {
      node.addEventListener("scroll", handleScroll);
      setReferenceNode(node);
    }
  };

  const url =
    "https://myhomelyimages.s3.us-east-2.amazonaws.com/LEGAL_INTERNAL/202104+iPurchase+Agreement+Policy.docx.pdf";

  return (
    <Dialog
      onClose={() => setOpen(false)}
      classes={{ paper: classes.dialog }}
      open={open}
    >
      <div>
        <a href={url} target="_blank">
          <IconButton>
            <GetAppIcon />
          </IconButton>
        </a>
      </div>

      <div className={classes.root} ref={paneDidMount}>
        <div className={classes.header}>iPurchase Agreement</div>
        <ol>
          <li>
            <b>Agreement Summary</b> is hereto part of this Agreement and Policy
            herein
          </li>
          <li>
            <b>Legal, Accounting and Environmental Advice:</b> The parties
            acknowledge that any information provided by myHomely.io is not
            legal, tax or environmental advice.
          </li>
          <li>
            <b>Agreement in Writing:</b> If there is a conflict or discrepancy
            between any provisions added to this Agreement (including any
            Schedule attached hereto) and any provisions in the standard pre-set
            portion hereof, the added provisions shall supersede the standard
            pre-set provisions to the extent of such conflict or discrepancy.
            This Agreement including any Schedule attached hereto, shall
            constitute the entire Agreement between Buyer and Seller. There is
            no representation, warranty, collateral agreement or condition,
            which affects this Agreement other than as expressed herein. For the
            purposes of this Agreement, Seller means vendor and Buyer means
            purchaser. This Agreement shall be read with all changes of gender
            or number required by the context.
          </li>
          <li>
            <b>Time and Date:</b> Any reference to a time and date in this
            Agreement shall mean the time and date where the property is
            located.
          </li>
          <li>
            <b>Property Location:</b> Any reference to the Property mentioned in
            the Agreement Summary shall mean the property that seller is selling
            to the buyer
          </li>
          <li>
            <b> Deposit:</b> Buyer’s deposit will be held in trust pending
            completion or other termination of this Agreement and to be credited
            toward the purchase Price on completion subject to any adjustments
            outlined in the Agreement Summary. For the purposes of this
            Agreement, “Upon Acceptance” shall mean that the Buyer is required
            to deliver the deposit to the Deposit Holder within 2 working days
            of the acceptance of this Agreement. The parties to this Agreement
            hereby acknowledge that, unless otherwise provided for in this
            Agreement, the Deposit Holder shall place the deposit in trust in
            the Deposit Holder’s non-interest Trust Account and no interest
            shall be earned, received or paid on the deposit.
          </li>

          <li>
            <b>Irrevocability:</b> This offer shall be irrevocable by the Party
            outlined on Agreement Summary by the agreed irrevocable date
            indicated on Agreement Summary. After the irrevocable date, if not
            accepted, this offer shall be null and void and the deposit shall be
            returned to the Buyer in full without interest.
          </li>
          <li>
            <b>Completion Date:</b> This agreement shall be completed by the
            agreed completion date indicated on the Agreement Summary. Upon
            completion, vacant possession of the property shall be given to the
            Buyer unless otherwise provided for in this Agreement.
          </li>
          <li>
            <b>Notices:</b> The Seller hereby may contact the Buyer directly for
            the purpose of giving and receiving notices pursuant to this
            Agreement and vice versa. Both the Buyer and the Seller represent
            themselves for the purpose of giving and receiving notices pursuant
            to this Agreement. Any notice relating hereto or provided for herein
            shall be in writing. In addition to any provision contained herein
            and in any Schedule hereto, this offer, any counter-offer, notice of
            acceptance thereof or any notice to be given or received pursuant to
            this Agreement or any Schedule hereto (any of them, “Document”)
            shall be deemed given and received when delivered personally, or
            where an email address is provided on Agreement Summary, when
            transmitted electronically to that email address, respectively, in
            which case, the signature(s) of the party (parties) shall be deemed
            to be original
          </li>
          <li>
            <b>Chattels Included & Fixtures Excluded:</b> Unless otherwise
            stated in the Agreement Summary, Seller agrees to convey all
            chattels and fixtures included in the Purchase Price and free from
            all liens, encumbrances or claims affecting the said fixtures and
            chattels
          </li>
          <li>
            <b> Rental Items (including Lease, Lease to Own):</b> as listed in
            the Agreement Summary, rented equipment is not included in the
            Purchase Price. The Buyer agrees to assume the rental contract(s),
            if assumable, the Buyer agrees to co-operate and execute such
            documentation as may be required to facilitate such assumption.
          </li>
          <li>
            <b>HST:</b> If the sale of the property on the Agreement Summary is
            subject to Harmonized Sales Tax (HST), then such tax shall be
            included in the Purchase Price. If the sale of the property is not
            subject to HST, Seller agrees to certify on or before closing, that
            the sale of the property is not subject to HST. Any HST on chattels,
            if applicable, is not included in the Purchase Price.
          </li>
          <li>
            <b> Title Search:</b> as listed in the Agreement Summary, Buyer
            shall be allowed to examine the title to the property at Buyer’s own
            expense and until the earlier of: (i) thirty days from the later of
            the Requisition Date or the date on which the conditions in this
            Agreement are fulfilled or otherwise waived or; (ii) five days prior
            to completion, to satisfy Buyer that there are no outstanding work
            orders or deficiency notices affecting the property, and that its
            present use may be lawfully continued and that the principal
            building may be insured against risk of fire. Seller hereby consents
            to the municipality or other governmental agencies releasing to
            Buyer details of all outstanding work orders and deficiency notices
            affecting the property, and Seller agrees to execute and deliver
            such further authorizations in this regard as Buyer may reasonably
            require.
          </li>
          <li>
            <b>Future Use:</b> Seller and Buyer agree that there is no
            representation or warranty of any kind that the future intended use
            of the property by Buyer is or will be lawful except as may be
            specifically provided for in this Agreement.
          </li>

          <li>
            <b>Title:</b> Provided that the title to the property is good and
            free from all registered restrictions, charges, liens, and
            encumbrances except as otherwise specifically provided in this
            Agreement and save and except for (a) any registered restrictions or
            covenants that run with the land providing that such are complied
            with; (b) any registered municipal agreements and registered
            agreements with publicly regulated utilities providing such have
            been complied with, or security has been posted to ensure compliance
            and completion, as evidenced by a letter from the relevant
            municipality or regulated utility; (c) any minor easements for the
            supply of domestic utility or telephone services to the property or
            adjacent properties; and (d) any easements for drainage, storm or
            sanitary sewers, public utility lines, telephone lines, cable
            television lines or other services which do not materially affect
            the use of the property. If within the specified times referred to
            in paragraph 8 any valid objection to title or to any outstanding
            work order or deficiency notice, or to the fact that said present
            use may not lawfully be continued, or that the principal building
            may not be insured against risk of fire is made in writing to Seller
            and which Seller is unable or unwilling to remove, remedy or satisfy
            or obtain insurance save and except against risk of fire (Title
            Insurance) in favour of the Buyer and any mortgagee, (with all
            related costs at the expense of the Seller), and which Buyer will
            not waive, this Agreement notwithstanding any intermediate acts or
            negotiations in respect of such objections, shall be at an end and
            all monies paid shall be returned without interest or deduction and
            Seller, Listing Brokerage and Co-operating Brokerage shall not be
            liable for any costs or damages. Save as to any valid objection so
            made by such day and except for any objection going to the root of
            the title, Buyer shall be conclusively deemed to have accepted
            Seller's title to the property.
          </li>
          <li>
            <b>Closing Agreements:</b> Where each of the Seller and Buyer may
            retain a lawyer arranged by themselves or through myHomely Services
            to complete the Agreement of Purchase and Sale of the property, and
            where the transaction will be completed by electronic registration
            pursuant to Part III of the Land Registration Reform Act, R.S.O.
            1990, Chapter L4 and the Electronic Registration Act, S.O. 1991,
            Chapter 44, and any amendments thereto, the Seller and Buyer
            acknowledge and agree that the exchange of closing funds,
            non-registrable documents and other items (the “Requisite
            Deliveries”) and the release thereof to the Seller and Buyer will
            (a) not occur at the same time as the registration of the
            transfer/deed (and any other documents intended to be registered in
            connection with the completion of this transaction) and (b) be
            subject to conditions whereby the lawyer(s) receiving any of the
            Requisite Deliveries will be required to hold same in trust and not
            release same except in accordance with the terms of a document
            registration agreement between the said lawyers. The Seller and
            Buyer irrevocably instruct the said lawyers to be bound by the
            document registration agreement which is recommended from time to
            time by the Law Society of Upper Canada. Unless otherwise agreed to
            by the lawyers, such exchange of the Requisite Deliveries will occur
            in the applicable Land Titles Office or such other location
            agreeable to both lawyers.
          </li>
          <li>
            <b>Documents and Discharge:</b> Buyer shall not call for the
            production of any title deed, abstract, survey or other evidence of
            title to the property except such as are in the possession or
            control of Seller. If requested by Buyer, Seller will deliver any
            sketch or survey of the property within Seller's control to Buyer as
            soon as possible and prior to the Requisition Date. If a discharge
            of any Charge/Mortgage held by a corporation incorporated pursuant
            to the Trust And Loan Companies Act (Canada), Chartered Bank, Trust
            Company, Credit Union, Caisse Populaire or Insurance Company and
            which is not to be assumed by Buyer on completion, is not available
            in registrable form on completion, Buyer agrees to accept Seller's
            lawyer's personal undertaking to obtain, out of the closing funds, a
            discharge in registrable form and to register same, or cause same to
            be registered, on title within a reasonable period of time after
            completion, provided that on or before completion Seller shall
            provide to Buyer a mortgage statement prepared by the mortgagee
            setting out the balance required to obtain the discharge, and, where
            a real-time electronic cleared funds transfer system is not being
            used, a direction executed by Seller directing payment to the
            mortgagee of the amount required to obtain the discharge out of the
            balance due on completion.
          </li>
          <li>
            <b>Inspection:</b> Buyer acknowledges having had the opportunity to
            inspect the property and understands that upon acceptance of this
            offer there shall be a binding agreement of purchase and sale
            between Buyer and Seller. The Buyer acknowledges having the
            opportunity to include a requirement for a property inspection
            report in this Agreement and agrees that except as may be
            specifically provided for in this Agreement, the Buyer will not be
            obtaining a property inspection or property inspection report
            regarding the property.
          </li>
          <li>
            <b>Insurance:</b> All buildings on the property and all other things
            being purchased shall be and remain until completion at the risk of
            Seller. Pending completion, Seller shall hold all insurance
            policies, if any, and the proceeds thereof in trust for the parties
            as their interests may appear and in the event of substantial
            damage, Buyer may either terminate this Agreement and have all money
            paid returned without interest or deduction or else take the
            proceeds of any insurance and complete the purchase. No insurance
            shall be transferred on completion. If Seller is taking back a
            Charge/Mortgage, or Buyer is assuming a Charge/Mortgage, Buyer shall
            supply Seller with reasonable evidence of adequate insurance to
            protect Seller's or other mortgagee's interest on completion.
          </li>
          <li>
            <b>Planning Act:</b> This Agreement shall be effective to create an
            interest in the property only if Seller complies with the
            subdivision control provisions of the Planning Act by completion and
            Seller covenants to proceed diligently at Seller’s expense to obtain
            any necessary consent by completion.
          </li>
          <li>
            <b>Document Preparation:</b> The Transfer/Deed shall, save for the
            Land Transfer Tax Affidavit, be prepared in registrable form at the
            expense of Seller, and any Charge/Mortgage to be given back by the
            Buyer to Seller at the expense of the Buyer. If requested by Buyer,
            Seller covenants that the Transfer/Deed to be delivered on
            completion shall contain the statements contemplated by Section
            50(22) of the Planning Act, R.S.O.1990.
          </li>
          <li>
            <b> Residency:</b> Buyer shall be credited towards the Purchase
            Price with the amount, if any, necessary for Buyer to pay to the
            Minister of National Revenue to satisfy Buyer's liability in respect
            of tax payable by Seller under the non-residency provisions of the
            Income Tax Act by reason of this sale. Buyer shall not claim such
            credit if Seller delivers on completion the prescribed certificate
            or a statutory declaration that Seller is not then a non-resident of
            Canada.
          </li>
          <li>
            <b>Adjustments:</b> Any rents, mortgage interest, realty taxes
            including local improvement rates and unmetered public or private
            utility charges and unmetered cost of fuel, as applicable, shall be
            apportioned and allowed to the day of completion, the day of
            completion itself to be apportioned to Buyer.
          </li>
          <li>
            <b>Time limits:</b> Time shall in all respects be of the essence
            hereof provided that the time for doing or completing of any matter
            provided for herein may be extended or abridged by an agreement in
            writing or digitally signed by Seller and Buyer or by their
            respective lawyers who may be specifically authorized in that
            regard.
          </li>
          <li>
            <b>Tender:</b> Any tender of documents or money hereunder may be
            made upon Seller or Buyer or their respective lawyers on the day set
            for completion. Money shall be tendered with funds drawn on a trust
            account in the form of a bank draft, certified cheque or digital
            transfer.
          </li>
          <li>
            <b>Family Law Act:</b>Seller warrants that spousal consent is not
            necessary to this transaction under the provisions of the Family Law
            Act, R.S.O.1990 unless Seller's spouse has executed the consent
            hereinafter provided.
          </li>
          <li>
            <b> UFFI:</b> Seller represents and warrants to Buyer that during
            the time Seller has owned the property, Seller has not caused any
            building on the property to be insulated with insulation containing
            urea formaldehyde, and that to the best of Seller's knowledge no
            building on the property contains or has ever contained insulation
            that contains urea formaldehyde. This warranty shall survive and not
            merge on the completion of this transaction, and if the building is
            part of a multiple unit building, this warranty shall only apply to
            that part of the building which is the subject of this transaction.
          </li>
          <li>
            <b>Consumer Reports:</b> The Buyer is hereby notified that a
            consumer report containing credit and/or personal information may be
            referred to in connection with this transaction.
          </li>
        </ol>
      </div>

      <div className={classes.absoluteContainer}>
        <Button
          className={classes.acceptButton}
          disabled={disabled}
          onClick={callback}
        >
          Accept iPurchase Agreement
        </Button>
      </div>
    </Dialog>
  );
}
